const pagess = {
    "ax": "page999",
    "æf": "page998",
    "æklū": "page997",
    "āfu": "page996"
    // add more mappings here
};

console.log(pagess);

document.getElementById("search_button").addEventListener("click", () => {
    console.log("Searching...");
    const query = document.getElementById("search_field").value.toLowerCase();
    console.log("Query:", query);
    openPage(pagess[query]);
});