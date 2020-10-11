/*\
title: $:/plugins/sebastianovide/gsebd/modules/macros/simple-list.js
type: application/javascript
module-type: macro

Write a simple list filter by a list of tags and with a + button in the header to create a new item.

@tags: is a list of tags coma separated. It accept spaces
@addButton: if it is none, none add button will be added. If it is empy, the default will be used. Othwerwise it ill overwrite it.
\*/

(function(){
  exports.name = "gsebd-simple-list";

  exports.params = [
      {name: "title"},
      {name: "tags"},
      {name: "excludeCurrent"},
      {name: "addButton"},
      {name: "defaultValue"},
      {name: "showBrief"},
      {name: "fields"},
      {name: "filter"},
      {name: "groupBy", default: "none"},
      {name: "sortBy", default: "none"},
      {name: "showDate"}
  ];

  exports.run = function(title, tags, excludeCurrent, addButton, defaultValue, showBrief, fields, filter, groupBy, sortBy, showDate) {    
    groupBy = $tw.wiki.renderText("text/plain", "text/vnd.tiddlywiki", groupBy);

    const currentTiddler = this.getVariable("currentTiddler")
    if (!excludeCurrent) {
      tags += "," + currentTiddler
    }
    tags = tags.split(",").map(s => s.trim())

    let sortFilterTW = ""
    if ( sortBy !== "none") {
      sortFilterTW = ` +[sort[${sortBy}]]`
    }

    const tag = tags[0]
    const tagsTW = tags.reduce((r, v) => r + (r === "" ? "" : " " ) + "[[" + v + "]]", "");
    const filterTags = tags.reduce((r, v) => r + (r === "" ? "" : " +" ) + "[tag[" + v + "]]", "");
    const filterTW = (filter || filterTags) + sortFilterTW;
    const tmpNewTiddlerField = `new_${currentTiddler}_${title}`.replace(/ /g,"_");
    const titleWT = title !== "" ? `<strong>${title}</strong><hr/>` : ""

    const saveActionsWT = `
    <$action-createtiddler
        $basetitle={{$/tmp!!${tmpNewTiddlerField}}}
        tags="${tagsTW}"
        ${fields}
    />
    <$action-deletefield $tiddler="$/tmp" $field="${tmpNewTiddlerField}"/>`;
    // <$action-setfield $tiddler="$/tmp" $field="${tmpNewTiddlerField}" $value="${defaultValue}"/>`;

    // TODO: I don't know how to make the "default value" to work
    const addButtonWT = addButton === "none" ? "" : (addButton || `
      <$keyboard key="enter" actions="""${saveActionsWT}""">
        <$edit-text tiddler="$/tmp" field="${tmpNewTiddlerField}" type="text" size="40" placeholder="enter a new ${title} here" default="${defaultValue}"/>
      </$keyboard>`);

    // TODO: show only part of it... a brief
    const briefWT = showBrief ? `
    <span>
    <$view/>
    </span>` : "";

    let listsWT = "";

    const showDateTW = !!showDate ? '<span class="list-date"><$view field="modified" format="date" template="DDD, DDth mmm YYYY 0hh:0mm:0ss"/></span>' : "";
    const listItemWT =
      `<$set name="goalClass" filter="[is[current]tag[Goal]]" value="list-item goal" emptyValue="list-item">
          <div class=<<goalClass>>>
            <$transclude tiddler="$:/plugins/sebastianovide/gsebd/ui/lists/ListViewPrefix"/>
            <span class="list-link"><$link to={{!!title}}><$view field="title"/></$link>${briefWT}</span>
            ${showDateTW}
            <$transclude tiddler="$:/plugins/sebastianovide/gsebd/ui/lists/ListViewSuffix"/>
          </div>
        </$set>`;

    if (groupBy !== "none") {
      const type = groupBy.replace("gsd_", "");

      listsWT =
         `<$list filter="[field:gsd_type[${type}]]" variable=outer>
           <$list filter="${filterTW} +[!has[draft.of]] +[field:${groupBy}<outer>] +[limit[1]]" variable=nothing>
              <$link to=<<outer>>/><br/>
              <$list filter="${filterTW} +[!has[draft.of]] +[field:${groupBy}<outer>]">
                ${listItemWT}
              </$list>
            </$list>
          </$list>
          <$list filter="${filterTW} +[!has[draft.of]] +[field:${groupBy}[]] +[limit[1]]" variable=nothing>
            No ${type} assigned <br/>
            <$list filter="${filterTW} +[!has[draft.of]] +[field:${groupBy}[]]">
              ${listItemWT}
            </$list>
          </$list>`;
    } else {
      listsWT =
         `<$list filter="${filterTW} +[!has[draft.of]]">
            ${listItemWT}
          </$list>`;
    }

    let finalWT =
      `<div>
        ${titleWT}
        <div>
          ${listsWT}
        </div>

        ${addButtonWT}
      </div>`;

    return finalWT;
  };
})();
