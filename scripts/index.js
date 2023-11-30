'use strict'

const READER_JSON_FILE_URL = '/data/readerData.json';

function loadSearchBooks() {
    var url = ("/forms/borrowing_form.html?" +
        "searchTerm=" + encodeURIComponent($("#search-term").val()) +
        "&searchBy=" + encodeURIComponent($("#search-by-option").val()) +
        "&registrationCode=" + encodeURIComponent($("#registration-code").val())
    );
    window.location.href = url;
};


$(document).ready(function () {
    $("button[id^='btn']").click(function () {
        var buttonId = $(this).attr('id');
        window.location.href = buttonId.replace('btn_', '') + ".html";
    });

    $("#search-term").keypress(function (event) {
        if (event.which === 13) {
            loadSearchBooks();
        }
    });

    $("#search-button").click(function () {
        loadSearchBooks();
    });

    // Open the modal
    $("#sign-in-btn").click(function () {
        $("#modal-sign-in").css("display", "block");
    });

    // Close the modal
    $(".close").click(function () {
        $("#modal-sign-in").css("display", "none");
    });

    // Close the modal if the user clicks outside the modal
    $(window).click(function (e) {
        if (e.target.id === "modal-sign-in") {
            $("#modal-sign-in").css("display", "none");
        }
    });

    // Handle Sign In button click
    $("#signInBtn").click(function () {
        var registrationCode = $("#registrationCode").val();
        $.getJSON(READER_JSON_FILE_URL, function (readers) {
            for (const reader of readers) {
                if (reader.registration_code == registrationCode) {
                    $("#reader-data").show();
                    $("#reader-name").val(reader.name);
                    $("#registration-code").val(reader.registration_code);
                    break;
                };
            }
            $("#modal-sign-in").css("display", "none");
        });
    });

    // Handle Cancel button click
    $("#cancelBtn").click(function () {
        // Add your cancel logic here
        // For demonstration purposes, we'll just close the modal
        $("#modal-sign-in").css("display", "none");
    });

});