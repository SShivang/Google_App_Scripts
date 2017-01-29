function myFunction() {
  var sheet = SpreadsheetApp.getActiveSheet();
 
  // var ss = SpreadsheetApp.openById("ENTER THE ID OF YOUR GOOGLE SPREADSHEET");
  var rawFirstTab = ss.getSheets()[0]; // "access data on different tabs"
  var rawSheet = ss.setActiveSheet(rawFirstTab);
  var rawData = rawSheet.getDataRange().getValues();
  
  /* run thru main sheet */
  var data = sheet.getDataRange().getValues();
  for(j in data){
    // skip first 2 rows
    if ( j < 2 )
      continue;
    
    var cols = data[j];
    var firstName = cols[2].toUpperCase();
    var lastName = cols[1].toUpperCase();
    var full = firstName + " " + lastName;    
    
    var sponsored = 0;
    var unsponsored = 0;
    
    var history = "";
     
    
    for(i in rawData){
      var rawCols = rawData[i];
      /* if first column contains first name and last name */
      var fullName = rawCols[1].toUpperCase();
      
      var f = fullName.split(" ")[0];
      var l = fullName.split(" ")[1].replace(",", "");      
      
      if ( (full.indexOf(f) > -1 && full.indexOf(l) > -1 ) || (fullName.indexOf(firstName) > -1 && fullName.indexOf(lastName) > -1 ) ){
        
        if (rawCols[3].equals("Unsponsored")){          
            unsponsored = unsponsored + rawCols[4];        
        }
        
        
        if (rawCols[3].equals("Sponsored")){          
           sponsored = sponsored + rawCols[4];        
        }
        
        
        history = history + "\n" + rawCols[0] + " " + rawCols[1] + " " + rawCols[2] + " " + rawCols[3] + " " + rawCols[4] + " " + rawCols[5] ;  
        
      }
      
    }
    
    
    var sponsoredStrikes = 0; 
    var totalHourStrikes = 0;
    
    if(sponsored < 5 && (sponsored + unsponsored < 40) ){
     
      sponsoredStrikes++;
      
    }
    
    
    if(unsponsored < 15 && ((sponsored- 5) + unsponsored < 15)){
     
      totalHourStrikes++;
      
    }
    
    if (sponsored == 0 && unsponsored ==0){
            
      totalHourStrikes++;

      
    }
   
    
    var x = sheet.getRange(Number(j)+1, 5);
    x.setValue( sponsored );
    
    var y = sheet.getRange(Number(j)+1, 6);
    y.setValue( unsponsored ); 
    
    var z = sheet.getRange(Number(j) + 1, 8);
    z.setValue(sponsoredStrikes);
    
    var w = sheet.getRange(Number(j) + 1, 9);
    w.setValue(totalHourStrikes); 
    
    
 
    //Logger.log( firstName + "  " + lastName + " : " + "  Sponsored Hours: " + sponsored + "  Unsponsored Hours: " + unsponsored);
    
  
    var email = SpreadsheetApp.openById('1pPS4_MdpI2lgMPMElmH73ZyiNBZKH996ok9u1yGfUk8');
    var emailFirstTab = email.getSheets()[0]; // "access data on different tabs"
    var emailSheet = email.setActiveSheet(emailFirstTab);
    var emailData = emailSheet.getDataRange().getValues();
    
       for (index in emailData){
         
         var first = emailData[index][0].toUpperCase().split(" ")[0];
         var last = emailData[index][0].toUpperCase().split(" ")[1];
         
         if(full.indexOf(first) > -1 && full.indexOf(last) > -1){
         
       //    Logger.log(emailData[index][1] + ": " + emailData[index][0] );
           
           var email = emailData[index][1] ;
           var subject = "Your NHS Hours";
           
           var message = ""; 
           
           if(totalHourStrikes || sponsoredStrikes){
           
       //     message = "Hello " + emailData[index][0] + ",\n\n" + "Based on the hours you have entered on so far on the NHS google form, you have "  + sponsored + " sponsored hours and " +  unsponsored + " unsponsored hours" + " . If you don't finish logging your hours, you will have " + Number(sponsoredStrikes + totalHourStrikes) + " strikes added. "  + "You have till January 3rd at noon to log your hours.\n\n\nLASA NHS uses a strike system to help ensure that each member of our organization is doing their part.\n\t - 1 strike will be given to those who miss a meeting without giving proper notice,\n\t - 1 strike will be given to those who do not complete the required number of total hours per semester,\n\t - 1 strike will be given to those who do not complete the required number of sponsored hours (unless they have 40 unsponsored hours), \n\t - 1 strike will be given for those who do not log hours.\n\nAdditionally, strikes roll over from semester to semester and year to year! \n\nIf there are any discrepancies please contact LASA NHS.\n\nThanks,\nShivang Singh\n(NHS treasurer)"; 
           
           }else{
             
        //    message = "Hello " + emailData[index][0] + ",\n\n" + "According to our records you have "  + sponsored + " sponsored hours and " +  unsponsored + " unsponsored hours" + ". You have met your fall NHS hour requirement. \n\nIf there are any discrepancies please contact LASA NHS. \n\nThanks,\nShivang Singh\n(NHS treasurer)"; 

           }
             
           Logger.log(email);
           
      //     MailApp.sendEmail(email, "lasanhs@gmail.com" , subject, message);
           
            Logger.log(history);
    
         }
           
       }
      
      
       
       }
  }
  

  
    