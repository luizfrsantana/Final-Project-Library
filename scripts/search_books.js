'use strict'

const JSON_FILE_URL = "/data/bookData.json";

var urlParams = new URLSearchParams(window.location.search);
var searchTerm = URL_PARAMS.get('searchTerm');
var searchBy = URL_PARAMS.get('searchBy');


function displayResults(results) {
    var resultsContainer = $("#search-results");
    resultsContainer.empty(); // Clear previous results

    if (results.length === 0) {
        resultsContainer.append("<br><br><p>No matching books found.</p>");
        return;
    }
    // Create a table and header row
    var table = $("<table id='table-results'>");
    var headerRow = $("<tr>").append(
        "<th>TITLE</th>" +
        "<th>AUTHOR</th>" +
        "<th>EDITION</th>" +
        "<th>YEAR</th>" +
        "<th>GENRE</th>" +
        "<th>PUBLISHER</th>" +
        "<th>PAGES</th>" +
        "<th>ISBN</th>" +
        "<th>TOTAL</th>" +
        "<th>AVAILABLE</th>" +
        "<th>ACTION</th>"
    );

    table.append(headerRow);

    // Add rows for each book in the results
    results.forEach(function (book) {
        var row = $("<tr>").append(
            "<td>" + book.title + "</td>" +
            "<td>" + book.author + "</td>" +
            "<td>" + book.edition + "</td>" +
            "<td>" + book.year + "</td>" +
            "<td>" + book.genre + "</td>" +
            "<td>" + book.publisher + "</td>" +
            "<td>" + book.pages + "</td>" +
            "<td>" + book.isbn + "</td>" +
            "<td>" + book.total + "</td>" +
            "<td>" + book.availables + "</td>" +
            `<td><button id='borrow${book.isbn}'>Borrow</button></td>`
        );
        table.append(row);
    });

    // Append the table to the results container
    resultsContainer.append(table);
};


function searchBooks() {
    var results = [];
    $.getJSON(JSON_FILE_URL, function (books) {
        for (const book of books) {
            var attrVal = book[SEARCH_BY];
            if (attrVal.toLowerCase().includes(SEARCH_TERM.toLowerCase())) {
                results.push(book);
            }
        }
        displayResults(results);
    });
}

searchBooks();