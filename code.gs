//Find and rename labels in Gmail
//Author: Jagatjit Turuk
//Github: https://github.com/Jagatjeet

function find_and_replace_labels() {
  const threads = GmailApp.getInboxThreads();
   const replaced_labels = [];
   const not_replaced_labels = [];
   GmailApp.getUserLabels().forEach((label)=>{

      if (label.getName().indexOf("text_to_be_replaced") > -1) {
        newLabel = label.getName().replace("text_to_be_replaced","text_to_be_used_new")
        var oldLabel = GmailApp.getUserLabelByName(label.getName());
        Logger.log("Processing old label: " + oldLabel.getName());
        var threads  = oldLabel.getThreads();
        Logger.log("Processing threads: " + threads.length);

        if(threads.length < 100){ //Cannot process threads with 100 or more mails
          GmailApp.deleteLabel(oldLabel);
          GmailApp.createLabel(newLabel).addToThreads(threads);
          Logger.log("Successfully processed this label: " + newLabel.getName());
          replaced_labels.push(newLabel);
        } else {
          Logger.log("Could not process this label: " + oldLabel.getName());
          not_replaced_labels.push(oldLabel);
        }

      }
      
    })

    Logger.log("Successfully processed labels: " + replaced_labels.length);
    Logger.log("Could not process labels: " + not_replaced_labels.length);
}
