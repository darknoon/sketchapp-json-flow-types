# Generating examples

Select an object you would like to see as JSON, and run this via the `Custom Plugin` menu item in Sketch 43 beta:

    log(asJSON(context.selection[0]));

    function asJSON(o) {
     const imm = o.immutableModelObject();
     const string = [MSJSONDataArchiver archiveStringWithRootObject:imm error:nil];
     return string;
    } 
