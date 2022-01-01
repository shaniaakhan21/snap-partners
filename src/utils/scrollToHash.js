export default function scrollToHash() {
    const id = window.location.hash.substr(1);
    if(id) {
        const anchor = document.getElementById(id);
        if(anchor) {
            setTimeout(function(){anchor.scrollIntoView();}, 1000);
        }
    }
}