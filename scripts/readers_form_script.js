'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')
const modalClose = () => document.getElementById('modal').classList.remove('active')

document.getElementById('modalClose').addEventListener('click',modalClose);
document.getElementById('modalCancel').addEventListener('click',modalClose);

var jsonFileUrl = '/data/readerData.json';

function loadAndDisplayReaders() {
    $.getJSON(jsonFileUrl, function (data) {
        displayReaders(data);
    });
}

function displayReaders(results) {
    var tableBody = $(".records tbody");
    tableBody.empty();
    results.forEach(function (reader) {
        var row = $("<tr>").append(
        "<td>" + reader.name + "</td>" +
        "<td>" + reader.dob + "</td>" +
        "<td>" + reader.registration_code + "</td>" +
        "<td>" + reader.phone + "</td>" +
        "<td>" + reader.email + "</td>" +
        "<td>" + reader.address + "</td>" +
        "<td><button type='button' class='btn green edit'>Edit</button> <button type='button' class='btn red'>Delete</button></td>"
        );
    tableBody.append(row);
    });
}

function deleteReader(rowIndex) {
    $('#ReaderForm').append('<input type="hidden" name="rowIndex" value="' + rowIndex + '">');
    $('#ReaderForm input[name="action"]').val('delete');
    $('#ReaderForm').submit();
}

function loadModal(name,dob,registration_code,phone,email,address){
    $('#modal #name').val(name);
    $('#modal #dob').val(dob);
    $('#modal #registration_code').val(registration_code);
    $('#modal #phone').val(phone);
    $('#modal #email').val(email);
    $('#modal #address').val(address);
}

$(document).ready(function () {
    loadAndDisplayReaders();

    $('#ReaderRegistration').on('click', function () {
        loadModal(null,null,null,null,null,null);
        $('#ReaderForm input[name="action"]').val('add');
        openModal();
    });

    $('table.records tbody').on('click', 'tr', function () {
        var cells = $(this).find('td');

        $('.btn.green.edit').on('click',function(){
            loadModal($(cells[0]).text(),$(cells[1]).text(),$(cells[2]).text(),$(cells[3]).text(),$(cells[4]).text(),$(cells[5]).text());
            var rowIndex = $(this).closest('tr').index();
            console.log(rowIndex)
            $('#ReaderForm').append('<input type="hidden" name="rowIndex" value="' + rowIndex + '">');
            $('#ReaderForm input[name="action"]').val('edit');

            openModal();
            
        });

        $('.btn.red').on('click', function () {
            var rowIndex = $(this).closest('tr').index();
            deleteReader(rowIndex);
        });

    });
});
