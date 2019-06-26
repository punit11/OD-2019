/*
 * @author Sanford Whiteman
 * @version v1.104
 * @license MIT License: This license must appear with all reproductions of this software.
 *
 * Create a completely barebones, user-styles-only Marketo form
 * by removing inline STYLE attributes and disabling STYLE and LINK elements
 */
function destyleMktoForm(mktoForm, moreStyles){
	var formEl = mktoForm.getFormElem()[0],
		arrayFrom = Function.prototype.call.bind(Array.prototype.slice);

	// remove element styles from <form> and children
	var styledEls = arrayFrom(formEl.querySelectorAll("[style]")).concat(formEl);	
	styledEls.forEach(function(el) {
        el.removeAttribute("style");
        console.log("Mkt inline forms stlying removed");
	});

	// disable remote stylesheets and local <style>s
	var styleSheets = arrayFrom(document.styleSheets);	
	styleSheets.forEach(function(ss) {
		if ( [mktoForms2BaseStyle,mktoForms2ThemeStyle].indexOf(ss.ownerNode) != -1 || formEl.contains(ss.ownerNode) ) {
            ss.disabled = true;
            console.log("Mkt remote forms stlying removed");
		}
	});
         
   if(!moreStyles) {
      formEl.setAttribute("data-styles-ready", "true");
   }
}

MktoForms2.whenRendered(function(form) {
  destyleMktoForm(form);
});

export default destyleMktoForm;