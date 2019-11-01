// TODO

/*\
title: $:/plugins/sebastianovide/gsebd/modules/macros/to-UTC.js
type: application/javascript
module-type: macro

calculate the difference in days from one date to another

\*/

(function(){
  exports.name = "gsebd-date-diff-days";

  exports.params = [
      {name: "from"},
      {name: "to"},
      {name: "fromField"},
      {name: "toField"}
  ];

  exports.run = function(from, to, fromField, toField) {
    from = toDays.bind(this)(from, fromField);
    to = toDays.bind(this)(to, toField);
    
    return String(Math.round(to - from));
  }
  
  // TODO: check UTC
  function toDays(date, dateField) {
    if (!date && dateField) {
      const currentTiddler = this.getVariable("currentTiddler")
      date = $tw.wiki.renderText("text/plain","text/vnd.tiddlywiki", `{{${currentTiddler}!!${dateField}}}`);
    } else {
      date = $tw.wiki.renderText("text/plain","text/vnd.tiddlywiki", date);
    }

    
    // if (date.length === 17) {
    //   const year = value.substr(0,4);
    //   const month = value.substr(4,2);
    //   const day = value.substr(6,2);
    //   // const hour = value.substr(8,2);
    //   // const minutes = value.substr(10,2);
    //   // const seconds = value.substr(12,2);
    //   // const mills = value.substr(14,3);
    // 
    //   date = new Date(`${year}-${month}-${day}`);
    // } else if (date) {
    //   date = new Date(date);
    // } else {
    //   date = new Date();
    // }
    
    date = date ? new Date(date) : new Date();
    
    return date.getTime()/(1000*60*60*24);
  }

})();