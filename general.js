const footer = `
<footer>
<nav class="sub">
    <a href="https://github.com/Puppychan" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-github-alt"></i>
    </a>
    <a href="https://www.linkedin.com/in/nhung-tran-528396210/" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-linkedin"></i>
    </a>
    <a href="https://www.facebook.com/rinkaki.toran/" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-facebook"></i>
    </a>
    <a href="mailto:nhungmaitran1412@gmail.com" target="_blank" rel="noopener noreferrer">
        <i class="fa-regular fa-envelope-open"></i>
    </a>
</nav>
<nav class="main">
    <a href="../about.html" target="_blank" rel="noopener noreferrer">
        About Us
    </a>
    <a href="../privacy.html" target="_blank" rel="noopener noreferrer">
        Privacy Policy
    </a>
    <a href="../terms.html" target="_blank" rel="noopener noreferrer">
        Terms
    </a>
    <a href="../copyright.html" target="_blank" rel="noopener noreferrer">
        Copyright
    </a>
    <a href="../contact.html" target="_blank" rel="noopener noreferrer">
        Contact Us
    </a>
</nav>
</footer>
`
const generateComment = (refs) => {
    return `
    <!-- 
        RMIT University Vietnam
        Course: COSC2430 Web Programming
        Semester: 2023A
        Assessment: Assignment 1
        Author: Tran Mai Nhung
        ID: s3879954
        Acknowledgement: 
            ${refs.map(ref => {
        return `- ${ref}`
    }).join('\n            ')}
    -->
    `
}
// Function to generate an HTML file and add a download link to the document
function createHtmlFile(filename, content) {
    // Create a Blob with the file's content
    var blob = new Blob([content], { type: "text/html;charset=utf-8" });

    // Create a link element
    var link = document.createElement("a");

    // Set the link's href to the Blob URL
    link.href = URL.createObjectURL(blob);

    // Set the download attribute to specify the filename
    link.download = filename;

    // Set the link text
    link.textContent = "Download " + filename;

    // Append the link to the document
    document.body.appendChild(link);

    // Add a line break for spacing
    document.body.appendChild(document.createElement('br'));
}
const generateHtml = (type, title, refs) => {
    let additional = ""
    if (type == "details") {
        additional = `<link rel="stylesheet" href="../css/details.css">`
    }
    return `${generateComment(refs)}
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <script src="https://kit.fontawesome.com/501ce2b63b.js" crossorigin="anonymous"></script>
        <link rel="icon" href="/assets/logo-light.png" type="image/x-icon" />
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/nav-footer.css">
        ${additional}
        <title>${title}</title>
    </head>
    `
}
const generateNav = (books, currentLocation = "details") => {
    const header = `
    <header>
    <input type="checkbox" id="nav-check">
    <img src="/assets/logo.png" alt="Hermes Library Logo" class="nav-logo" >
    <div class="nav-btn">
        <label for="nav-check">
            <i class="fa-solid fa-bars"></i>
        </label>
    </div>
    <nav>
        <a href="../index.html" target="_blank" rel="noopener noreferrer">
            Home
        </a>
        ${books.map(cat => {
        return `<a href="${generateLink("cat", cat.title, currentLocation)}" target="_blank" rel="noopener noreferrer">
            ${cat.title}
        </a>`
    }).join('\n')}
        <a href="../contact.html" target="_blank" rel="noopener noreferrer">
            Contact Us
        </a>
    </nav>
    </header>
    `
    return header;
}
const generateBodyDetails = (book, cat, header) => {
    console.log(book.title, book.images);
    return `
    ${generateHtml("details", book.title, book.refs)}
    <body>
        ${header}
        <section class="content">
        <section class="breadcrumb-container">
            <ul class="breadcrumb">
                <li>
                    <a href="">
                        <i class="fa-solid fa-glasses icon"></i>
                        <span class="text">${book.title}</span>
                    </a>
                </li>
                <li>
                    <a href="${generateLink("cat", cat.title, "details")}" target="_blank">
                        <i class="fa-solid fa-book-open icon"></i>
                        <span class="text">${cat.title}</span>
                    </a>
                </li>
                <li>
                    <a href="../index.html" target="_blank">
                        <i class="fa-solid fa-house icon"></i>
                    </a>
                </li>
            </ul>
        </section>
        <section class="details-illustration">
            ${book.images.map((img, index) => {
        return `<img src="${img}" alt="First ${book.title}'s image" class="details-illustration-${index == 0 ? "main" : "sub"}" onerror="this.onerror=null;this.src='${`https://source.unsplash.com/random?book&${index}`}'">`
    }).join('\n            ')
        }
            <div class="details-illustration-price">
                <span>Buy now</span>
                <span>${book.price}$</span>
            </div>
            <button class="details-illustration-btn button-1" id="btn">Add to cart</button>
        </section>
        <hr>
        <section class="details-info">
            <h1 class="details-info-title">${book.title}</h1>
            <h3 class="details-info-author">${book.author.map(author => {
            return author;
        }).join(' - ')}</h3>
            <p class="details-info-desc">
                ${book.description}
            </p>
        </section>
    </section>
    <!-- The Modal -->
    <div id="priceModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <i class="fa-solid fa-x close"></i>
            <div class="modal-content-img">
                <i class="fa-solid fa-star modal-content-img-main"></i>
                <i class="fa-solid fa-star modal-content-img-sub1"></i>
                <i class="fa-solid fa-star modal-content-img-sub2"></i>
            </div>
            <div class="modal-content-text">
                <h2>Congratulations!!</h2>
                <p>You have successfully added the book to your cart.</p>
            </div>
        </div>
        </div>
    </div>
    </div>
    ${footer}
    <script>
    
        let timeout;
        // Get the modal
        const modal = document.getElementById("priceModal");
        
        // Get the button that opens the modal
        const btn = document.getElementById("btn");
        
        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];
        
        // When the user clicks the button, open the modal 
        btn.onclick = function() {
            timeout = setTimeout(() => {
                modal.classList.add("show");
            }, 300);
        }
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.classList.remove("show");
            clearTimeout(timeout);
        }
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.classList.remove("show");
                clearTimeout(timeout);
            }
        }
    </script>
    </body>
    </html>
`
}
const generateId = (type, title) => {
    if (type == "cat") return `cat-${title.toLowerCase().replace(/[\s]/g, "-")}`
    return `subcat-${title.toLowerCase().replace(/[\s]/g, "-")}`
}
const generateBookCard = (book, index, subcat) => {
    return `<article class="card-book">
    <div class="card-book-img-container">
        <img src="${book.images[0]}" alt="${book.title}'s image ${index}" class="card-book-img"
        onerror="this.onerror=null;this.src='https://source.unsplash.com/random?book&${subcat.title.replace(" ", "-")}'">
        <div class="card-book-img-overlay"></div>
    </div>
    <div class="card-book-content">
        <h2 class="card-book-content-title">${book.title}</h2>
        <h4 class="card-book-content-author">${book.author.map(auth => auth).join(" - ")}</h4>
        <p class="card-book-content-description">
            ${book.description}
        </p>
    </div>
    <div class="card-book-footer">
        <p class="card-book-footer-price">${book.price}$</p>
        <a href="${generateLink("details", book.id, "cat")}" 
        target="_blank" rel="noopener noreferrer" 
        class="card-book-footer-btn button-2">
            <div class="card-book-footer-btn-bck"></div>
            <span class="card-book-footer-btn-content">Details</span>
            <span class="card-book-footer-btn-icon"><i class="fa-solid fa-arrow-right"></i></span>
        </a>

    </div>
</article>`
}
const generateBodyCat = (cat, header) => {
    return `
    ${generateHtml("cat", cat.title, cat.refs)}
    <body>
    ${header}
    <section class="intro">
        <div class="intro-img" style="background-image: url('../assets/${cat.title.toLowerCase()}.jpeg');">
        </div>
        <div class="intro-text">
            <h3>Hermes Library's</h3>
            <h1 class="opacity">${cat.title} Books</h1>
        </div>
    </section>
    <section class="content">
    <section class="cards subcategories">
        <h1 class="cards-header">Sub-Categories</h1>
        <div class="cards-content">
            ${cat.subcategories.map((subcat, index) => {
        return `<a class="card-image" href="#${generateId("subcat", subcat.title)}">
                <img src="https://source.unsplash.com/random?book&${index}" alt="Book Subcategory ${subcat.title} Image" class="card-image-img">
                <div class="card-image-overlay"></div>
                <h3 class="card-image-title">${subcat.title}</h3>
            </a>
                `;
    }).join('\n            ')}
        </div>
    </section>

   ${cat.subcategories.map(subcat => {
        return (
            `<section class="cards subcategory" id="${generateId("subcat", subcat.title)}">
        <h1 class="cards-header">${subcat.title}</h1>
        <div class="cards-content">
            ${subcat.books.map((book, index) => {
                return generateBookCard(book, index, subcat);
            }).join('\n            ')}
        </div>
    </section>
        `
        )
    }).join('\n    ')}
    
</section>
${footer}
<script src="./javascript/stopAnimation.js"></script>
</body>
</html>
`
}
const generateLink = (type, attr, currentLocation) => {
    if (type == "details") {
        // let currentName = attr.toLowerCase().replace(/[^\w\s]/g, '');
        // currentName = currentName.replace(/\s+/g, '-');
        let currentName = attr.toLowerCase();

        if (currentLocation == "cat")
            return `../details/details-${currentName}.html`
        else if (currentLocation == "index")
            return `./details/details-${currentName}.html`;
        return `details-${currentName}.html`
    } else if (type == "cat") {
        if (currentLocation == "cat")
            return `cat-${attr.toLowerCase()}.html`
        else if (currentLocation == "details")
            return `../categories/cat-${attr.toLowerCase()}.html`
        else if (currentLocation == "index")
            return `./categories/cat-${attr.toLowerCase()}.html`

    }
    return "";
}
// import books.json
fetch('books.json')
    .then(response => response.json())
    .then(data => {
        const books = data.books;
        // generate nav header
        let mainIndex = "";

        books.forEach(cat => {
            createHtmlFile(`${generateLink("cat", cat.title, "cat")}`, generateBodyCat(cat, generateNav(books)));
            let catIndex = `<section class="cards category" id="${generateId("cat", cat.title)}">
            <a href="${generateLink("cat", cat.title, "cat")}" target="_blank" class="cards-header">${cat.title}</a>
            <div class="cards-content">`;
            cat.subcategories.forEach(subcat => {
                subcat.books.forEach(book => {
                    // console.log(generateBodyDetails(book, cat, generateNav(books)));
                    catIndex += generateBookCard(book, subcat.books.indexOf(book), subcat);
                    createHtmlFile(`${generateLink("details", book.id, "details")}`, generateBodyDetails(book, cat, generateNav(books)));
                })
            })
            catIndex += `</div></section>`;
            mainIndex += catIndex;
        })
        console.log(mainIndex);
    })
    .catch(error => console.error('Error:', error));
