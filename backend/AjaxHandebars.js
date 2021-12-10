Handlebars.registerHelper("isThesis", function(value) {
    return value == 1 ? "<span style='color: red'>논문심사 필수</span>" : "<span style='color: blue'>졸업작품 발표</span>";
});