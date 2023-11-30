'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')
const modalClose = () => document.getElementById('modal').classList.remove('active')

document.getElementById('modalClose').addEventListener('click',modalClose);
document.getElementById('modalCancel').addEventListener('click',modalClose);

var jsonFileUrl = '/data/bookData.json';

function loadAndDisplayBooks() {
    $.getJSON(jsonFileUrl, function (data) {
        displayBooks(data);
    });
}

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
        "<td><button type='button' class='btn green edit'>Edit</button> <button type='button' class='btn red'>Delete</button></td>"
        );
    tableBody.append(row);
    });
}

function deleteBook(rowIndex) {
    $('#bookForm').append('<input type="hidden" name="rowIndex" value="' + rowIndex + '">');
    $('#bookForm input[name="action"]').val('delete');
    $('#bookForm').submit();
}

function loadModal(title,author,edition,year,genre,publisher,pages,isbn,total,availables){
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

}

$(document).ready(function () {
    loadAndDisplayBooks();

    $('#bookRegistration').on('click', function () {
        loadModal(null,null,null,null,null,null,null,null,null,null);
        $('#bookForm input[name="action"]').val('add');
        openModal();
    });

    $('table.records tbody').on('click', 'tr', function () {
        var cells = $(this).find('td');

        $('.btn.green.edit').on('click',function(){
            loadModal($(cells[0]).text(),$(cells[1]).text(),$(cells[2]).text(),$(cells[3]).text(),$(cells[4]).text(),$(cells[5]).text(),$(cells[6]).text(),$(cells[7]).text(),$(cells[8]).text(),$(cells[9]).text());
            var rowIndex = $(this).closest('tr').index();
            $('#bookForm').append('<input type="hidden" name="rowIndex" value="' + rowIndex + '">');
            $('#bookForm input[name="action"]').val('edit');

            openModal();
            
        });

        $('.btn.red').on('click', function () {
            var rowIndex = $(this).closest('tr').index();
            deleteBook(rowIndex);
        });

    });
});
