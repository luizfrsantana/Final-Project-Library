'use strict'

const BOOK_JSON_FILE_URL = '/data/bookData.json';
const BORROWING_JSON_FILE_URL = '/data/borrowingData.json';


const openModal = () => document.getElementById('modal').classList.add('active')
const modalClose = () => document.getElementById('modal').classList.remove('active')

const URL_PARAMS = new URLSearchParams(window.location.search);
const SEARCH_TERM = URL_PARAMS.get('searchTerm');
const SEARCH_BY = URL_PARAMS.get('searchBy');
const REGISTRATION_CODE = URL_PARAMS.get('registrationCode');

document.getElementById('modalClose').addEventListener('click', modalClose);
document.getElementById('modal-cancel').addEventListener('click', modalClose);

function loadRegistrationCode() {
    $('#registration-code').val(REGISTRATION_CODE);
}

function loadAndDisplayBooks() {
    var results = [];
    $.getJSON(BOOK_JSON_FILE_URL, function (books) {
        for (const book of books) {
            var attrVal = book[SEARCH_BY];
            if (attrVal.toLowerCase().includes(SEARCH_TERM.toLowerCase())) {
                results.push(book);
            };
        };
        displayBooks(results);
    });
};

function displayBooks(results) {
    var tableBody = $(".records tbody");
    tableBody.empty();
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
            "<td><button type='button' class='btn view-borrow'>Borrow</button>"
        );
        tableBody.append(row);
    });
}


function loadModal(title, author, edition, year, genre,
    publisher, pages, isbn, total, availables, registration_code) {
    $('#modal #title').val(title);
    $('#modal #author').val(author);
    $('#modal #edition').val(edition);
    $('#modal #year').val(year);
    $('#modal #genre').val(genre);
    $('#modal #publisher').val(publisher);
    $('#modal #pages').val(pages);
    $('#modal #isbn').val(isbn);
    $('#modal #total').val(total);
    $('#modal #availables').val(availables);
    $('#modal #registrationCodeBorrowing').val(registration_code);
};

$(document).ready(function () {
    // loadRegistrationCode();
    loadAndDisplayBooks();

    $('#bookRegistration').on('click', function () {
        loadModal(null, null, null, null, null, null,
            null, null, null, null, null);
        $('#borrowingForm input[name="action"]').val('add');
        openModal();
    });

    $('table.records tbody').on('click', 'tr', function () {
        var cells = $(this).find('td');

        $('.btn.view-borrow').on('click', function () {
            loadModal(
                $(cells[0]).text(), $(cells[1]).text(),
                $(cells[2]).text(), $(cells[3]).text(),
                $(cells[4]).text(), $(cells[5]).text(),
                $(cells[6]).text(), $(cells[7]).text(),
                $(cells[8]).text(), $(cells[9]).text(),
                REGISTRATION_CODE);
            var rowIndex = $(this).closest('tr').index();
            $('#borrowingForm').append('<input type="hidden" name="rowIndex" value="' + rowIndex + '">');
            $('#borrowingForm input[name="action"]').val('edit');

            openModal();

        });
    });
});