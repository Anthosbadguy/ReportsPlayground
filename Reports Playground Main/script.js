function tableCheckboxes(checkboxArray){
    
    var html="";
    
    $.each(checkboxArray.Text, function(index, value){
        
        html+='<input class="tablecheckbox" type="checkbox" id="'+checkboxArray.Values[index]+'" value="'+checkboxArray.Values[index]+'" '+checkboxArray.Selected[index]+'> <label for="'+checkboxArray.Values[index]+'">'+value+'</label><br>'
        
    });

    $('#checkboxcontainer').html(html);
}

function checkboxList (selectedObject){
    
    var options = {
      
        Account:{
            Text:["Annual Revenue","Assigned","Country","State","Phone","MobilePhone","Industry","Type"],
        Values:["Amount","Assigned","Country","State","Phone","MobilePhone","Industry","Type"],
            
            Selected:["","Checked","","","","","",""]
        },
        
        Opportunity:{
  
             Text:["Projected Revenue", "Account", "Assigned To","Decision Makers","Location","Department","Function","Estimated Closing Date","Real Closing Date","Workflow Type","Business Type","Sector","Current Stage"],
        Values:["Amount","Account", "Assigned","DecisionMakers","Location","Department","Function","EstimatedClosingDate","RealClosingDate","WFType","BusinessType","Sector","Stage"],
            
            Selected:["Checked","Checked", "Checked","","","","","","","","","","Checked"]
        },
        
        Contact:{
             Text:["Account","Assigned To","Parent Contact", "Country", "State", "Created Date", "Birthday", "Rating"],
        Values:["Account","Owner","Parent","Country","State","Created","Birthday","Rating"],
            
            Selected:["Checked","Checked","","","","","",""]
        },
        
        Staff:{
            
             Text:["Reports To","Location","Department","Function","Role","Title"],
        Values:["ReportsTo","Location","Department","Function","Role","Title"],
           Selected:["Checked","","","","Checked",""]
 
        },
          
          Product:{
            
             Text:["Cost","Suggested Price","Minimum Price","Product Type","Code","Active"],
        Values:["Cost","SuggestedPrice","MinimumPrice","Type","Code","Active"],
              
              Selected:["Checked","Checked","","","Checked",""]
 
        },
          
          Campaign:{
            
             Text:["Expected Revenue","Budgeted Cost","Actual Cost","Assigned To","Start Date","End Date","Campaign Type", "Workflow Status"],
        Values:["ExpectedRevenue","BudgetedCost","ActualCost","Assigned","StartDate","EndDate","Type","WFStatus"],
              
              Selected:["Checked","Checked","Checked","Checked","","","",""]
 
        }
        
    };
    
    return options[selectedObject] ;
}

function addFilterFields(filtertype, objectType){
     var html="";
    var dfnumber=$('.datefilter').length, rfnumber=$('.rangefilter').length;
    var dateoptions="",rangeoptions="";
    
    if(dfnumber>0 && filtertype=="Date")
        {
            $('#addDateFilter').hide(700);
            
        }
    
    if(rfnumber>0 && filtertype=="Range")
        {
            
           $('#addRangeFilter').hide(700);
            
        }
      
    
       switch(objectType){
            
        case "Account":
            dateoptions="<option value=''></option><option value=''></option>";
            rangeoptions="<option value='Amount'>Annual Revenue</option>";
            break;
            
            case "Contact":
            dateoptions="<option value='Birthday'>Birthday Date</option><option value='Created'>Created Date</option>";
            rangeoptions="";
            break;
            
            case "Staff":
            dateoptions="";
            rangeoptions="";
            break;
            
            case "Opportunity":
            dateoptions="<option value='EstimatedClosingDate'>Estimated Closing Date</option><option value='RealClosingDate'>Real Closing Date</option>";
            rangeoptions="<option value='Amount'>Projected Revenue</option>";
            break;
           
           	case "Campaign":
            dateoptions="<option value='StartDate'>Start Date</option><option value='EndDate'>End Date</option>";
            rangeoptions="<option value='ExpectedRevenue'>Expected Revenue</option><option value='BudgetedCost'>Budgeted Cost</option><option value='ActualCost'>Actual Cost</option>";
            break;        
            
            case "Product":
            dateoptions="";
            rangeoptions="<option value='Cost'>Cost</option><option value='SuggestedPrice'>Suggested Price</option><option value='MinimumPrice'>Minimum Price</option>";
            break;
    }
    
    
    
    switch(filtertype){
           
        case "Date":    
            if($('#df1').length>0){
                
                dfnumber=0;
            }
            
            html="<div id='df"+dfnumber+"' class='datefilter' style='display:none'><select><option value='Null'>Select a date Field</option>"+dateoptions+"</select>  <a class='removefilter'>Remove</a></div>";
            $('#datefiltercontainer').append(html);
            $('#df'+dfnumber).toggle(700);
            
            
            $(document).on('change','#df'+dfnumber+' select',function(){
                           
                           $("<input class='df"+dfnumber+"a'type='text' placeholder='Select starting date...'  style='display:none'><input class='df"+dfnumber+"b' type='text' placeholder='Select ending date...' style='display:none'>").insertAfter('#df'+dfnumber+' select');
                           
                $('#df'+dfnumber+' input').datepicker({ dateFormat: 'yy-mm-dd' })
                 $('#df'+dfnumber+' input').show(300);
                         $(document).off('change','#df'+dfnumber+' select');
            });

            break;
            
            
        case "Range":
 
            if($('#rf1').length>0){
                
                rfnumber=0;
            }
            html="<div id='rf"+rfnumber+"' class='rangefilter' style='display:none'><select><option value='Null'>Select a range Field</option>"+rangeoptions+"</select>  <a class='removefilter'>Remove</a></div>";
            $('#rangefiltercontainer').append(html);
            $('#rf'+rfnumber).toggle(700);
    
    
    $(document).on('change','#rf'+rfnumber+' select',function(){
                           
                           $("<input class='rf"+rfnumber+"a' type='text' placeholder='Select starting range...' style='display:none'><input class='rf"+rfnumber+"b' type='text' placeholder='Select ending range...' style='display:none'>").insertAfter('#rf'+rfnumber+' select');
        
                           $('#rf'+rfnumber+' input').show(300);

        
    $(document).off('change','#rf'+rfnumber+' select');
        
    });     
            break;
            
    }
    
}

//Filter data by date or range field
function filterDataFunc(objectData) {

    
    var filter={Date:[],Range:[],Null:""};
                
                
    $('.datefilter').each(function(index, value){ 
        
        var id=$(this).attr("id");
        
        var min= $('.'+id+'a').val()||false,
        max=$('.'+id+'b').val()||false,
        datefield=$('#'+id+' select').val();
       
        //include the min and max dates as positions 0 and 1 in the array that belongs to each Date index (If one of those is empty, it assigns a value of false to that variable.)
        //Also adds the selected date field in the third position, like this: Date=[[min, max, datefield],[min, max, datefield]].
        
      filter.Date[index]=[min, max,datefield];   
        
    });
    
    
    $.each(filter.Date, function (filterindex, filtervalues){ 
            
   // if(filter.Date[filterindex][0] != false && filter.Date[filterindex][1] != false)
        if(filtervalues[0] != false && filtervalues[1] != false)
        {
    
            
            if(filtervalues[0]<=filtervalues[1]){
                
                
                objectData= $.map(objectData,function(value, key){
                    
                 var min= new Date(filtervalues[0]), max= new Date(filtervalues[1]), date= new Date(value.Properties[filtervalues[2]] );
                    
                if(date>= min && date<= max )
                    {
                        return value;
                    }
                    else{
                        
                        return null;
                    }
                
            });
              
               
            }
           
            
        }
    });
    
    
   $('.rangefilter').each(function(index, value){ 
        
        var id=$(this).attr("id");
        
        var min= $('.'+id+'a').val()||"false",
        max=$('.'+id+'b').val()||"false",
        rangefield=$('#'+id+' select').val();
       
        //include the min and max dates as positions 0 and 1 in the array that belongs to each Range index (If one of those is empty, it assigns a value of false to that variable.)
        //Also adds the selected range field in the third position, like this: Range=[[min, max, rangefield],[min, max, rangefield]].
        
      filter.Range[index]=[min, max, rangefield];   
        
    });
    
    
    $.each(filter.Range, function (filterindex, filtervalues){ 
 
        if(filtervalues[0] != "false" && filtervalues[1] != "false")
        {         
            
            if(parseInt(filtervalues[0],10)<=parseInt(filtervalues[1],10)){
                objectData= $.map(objectData,function(value, key){
                    
                 var min= filtervalues[0], max= filtervalues[1], range= value.Properties[filtervalues[2]];
                   
                if(range>= min && range<= max )
                    {
                        
                        return value;
                    }
                    else{
                        
                        return null;
                    }
                
            });
              
               
            }
           
            
        }
    });
    
    
    return objectData;
}


function picklistContents(objectName,countorvalues) {
    
    var options = {
        
        Count:{
        
        Account:{
            Text:["Select an Option","Annual Revenue","Assigned","Country","State","Phone","MobilePhone","Industry","Type"],
        Values:["Null","Amount","Assigned","Country","State","Phone","MobilePhone","Industry","Type"]
        },
        
        Opportunity:{
  
             Text:["Select an Option","Projected Revenue", "Account", "Assigned To","Decision Makers","Location","Department","Function","Estimated Closing Date","Real Closing Date","Workflow Type","Business Type","Sector","Current Stage"],
        Values:["Null","Amount","Account", "Assigned","DecisionMakers","Location","Department","Function","EstimatedClosingDate","RealClosingDate","WFType","BusinessType","Sector","Stage"]
        },
        
        Contact:{
             Text:["Please Select an Option","Account","Assigned To","Parent Contact", "Country", "State", "Created Date", "Birthday", "Rating"],
        Values:["Null","Account","Owner","Parent","Country","State","Created","Birthday","Rating"]
        },
        
        Staff:{
            
             Text:["Please Select an Option","Reports To","Location","Department","Function","Role","Title"],
        Values:["Null","ReportsTo","Location","Department","Function","Role","Title"]
 
        },
          
          Product:{
            
             Text:["Select an Option","Cost","Suggested Price","Minimum Price","Product Type","Code","Active"],
        Values:["Null","Cost","SuggestedPrice","MinimumPrice","Type","Code","Active"]
 
        },
          
          Campaign:{
            
             Text:["Select an Option","Expected Revenue","Budgeted Cost","Actual Cost","Assigned To","Start Date","End Date","Campaign Type", "Workflow Status"],
        Values:["Null","ExpectedRevenue","BudgetedCost","ActualCost","Assigned","StartDate","EndDate","Type","WFStatus"]
 
        }
        
        },
        
        Values:{
            
         Account:{
            
              Text:["Select an Option","Annual Revenue"],
        Values:["Null","Amount"]
        },
        
        Opportunity:{
            
             Text:["Select an Option","Projected Revenue"],
        Values:["Null","Amount"]
  
        },
        
        Contact:{
            
             Text:["Select an Option"],
        Values:["Null"]
            
        },
        
        Staff:{
            
             Text:["Select an Option"],
        Values:["Null"]
            
 
        },
          
          Product:{
            
             Text:["Select an Option","Suggested Price","Minimum Price", "Cost"],
        Values:["Null","SuggestedPrice","MinimumPrice", "Cost"]
            
 
        },
          
          Campaign:{
            
             Text:["Select an Option","Expected Revenue","Budgeted Cost", "Actual Cost"],
        Values:["Null","ExpectedRevenue","BudgetedCost", "ActualCost"]
            
 
        }
            
        }
        
    };
    
    var optionarray= options[countorvalues][objectName] || [];
    
    var html= "";
        
        $.each(optionarray.Text,function(index, value){
       html+= '<option value="'+optionarray.Values[index]+'">'+value+'</option>';
          
    });

    
    $("#secondpicklist").html(html);
    
        }


    //OBSOLETE
    //Esta función se utiliza como subfunción de displayChart(), que posiblemente pase a ser drawGraphFunc();
    //Regresa la estructura de datos a ser utilizada al momento de crear la instancia de la gráfica
    //Específicamente, una estructura orientada a representar los valores de los datos

/*function valuesGraph(chartData, objectData){ 
        
        var selectedOption = $('#secondpicklist').val();
        $('#chartTitle').text($('#chartTitle').text() +' '+ ' Values Chart!');
        
        $.each(objectData, function(index, value){
            
            //console.log(value);
            chartData.labels.push(value.Name);
           chartData.datasets[0].data.push(value.Properties[selectedOption]);
            
            
        });
    
        return chartData;

    }
*/

function NEWVALUESGRAPH(chartData, objectData){ 
        
        var selectedOption = $('#secondpicklist').val();  
        
        //Get the values in an array
        var valuesArray=$.map(objectData, function(value, key){
            
            count+=1;
           return value.Properties[selectedOption];
        });
   
    //Variable to set the number of elements
        var count=valuesArray.length;
    //Range= [min, max, Real Range]
      var Range=[Math.min.apply(Math,valuesArray),Math.max.apply(Math,valuesArray)];
    Range[2]=Range[1]-Range[0];

        var intervalNumber= Math.round(1+(3.32*Math.log10(count)));
    
    var ancho= Range[2]/intervalNumber;
  
  if(!Number.isInteger(ancho)){
    ancho=parseInt(ancho);
    ancho+=1;
  }
  
  //Range[3]=newRange
  Range[3]=ancho*intervalNumber;
  //Range[4]=differencebetweenranges
  Range[4]=Range[3]-Range[2];  
  
   var intervalsArray=[];
    for(var i=0;i<intervalNumber;i++)
        {
          
          	//Fills each position of the intervalsArray with=[classmin, classmax, numberofitemsinclass]
            intervalsArray[i]=[Range[0]+((ancho+1)*i),Range[0]+((ancho)*(i+1)+(i)),0];
           
        }
    
	objectData.sort(function (a, b) {
  if (a.Properties[selectedOption] > b.Properties[selectedOption]) {
    return 1;
  }
  if (a.Properties[selectedOption] < b.Properties[selectedOption]) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
    $.each(intervalsArray, function(index, value){
        
        var min= value[0], max= value[1];
        $.each(objectData,function(index2, value2){ 
            
            
        var number= value2.Properties[selectedOption]
         if( number>=min && number<=max ){
             
             intervalsArray[index][2]+=1;
         }
              
        });
        
    });
    
        $.each(intervalsArray, function(index, value){
            
            //console.log(value);
            chartData.labels.push("["+parseInt(value[0])+" - "+parseInt(value[1])+"]");
           chartData.datasets[0].data.push(value[2]);
            
            
        });

    return [chartData, intervalsArray];
    }



    //Esta función se utiliza como subfunción de displayChart(), que posiblemente pase a ser drawGraphFunc();
    //Regresa la estructura de datos a ser utilizada al momento de crear la instancia de la gráfica
    //Específicamente, una estructura orientada a representar un conteo de los valores de los datos
function countGraph(chartData, objectData) {

        var selectedOption = $('#secondpicklist').val();
        var labelCount = {};
        //This function iterates over the structures of the json object array
        //And assigns a property to the labelCount structure with the  of
        //property name, the value in sector(CHANGE THIS TO ['VALUE FROM PICKLIST']),
        //Counts up the amount of times each value happens in the source structure
        //and puts that number in each of the new properties like this " [prop] :[#]"
        $.each(objectData, function (index, value) {


            var property = this.Properties[selectedOption];
            labelCount[property] = (labelCount[property] || 0) + 1;

        });

        //Now, take the names of the properties and push them
        //Into the labels array, so you have the different
        //names of the items that we gotin the labels of the chart
        for (var name in labelCount) {
            chartData.labels.push(name);
        }

        chartData.labels.sort(); //Sort the labels array

        //Now iterate through each label, and push their count value
        //(Which is stored in the labelCount structure), to the
        //chartData array for the first dataset(this might change, to apply 
        //to more datasets and stuff, probably?)
        $.each(chartData.labels, function (index, value) {

            chartData.datasets[0].data.push(labelCount[value]);


        });
        return chartData;
    }

    //Esta función genera una tabla con hiperlinks a los registros, utilizando dos parametros:
    //Si es para count, sólo el primero se usa, y es el objeto con los datos de los registros
    //El segundo es en caso de un values chart, y contiene el array con los intervalos
    //Para separar la tabla en categorías
function tableFunction(objectData, intervalData){
    
     var selectedOption = $('#secondpicklist').val(),
         selectedOptionText=$('#secondpicklist option:selected').text();
    	
    $('#checkboxcontainer').show(600);
    
    if(intervalData==null)
        {
       
        var labelCount = {};
    
    var html="";
        //This function iterates over the structures of the json object array
        //And assigns a property to the labelCount structure with the  of
        //property name, the value in sector(CHANGE THIS TO ['VALUE FROM PICKLIST']),
        //Counts up the amount of times each value happens in the source structure
        //and puts that number in each of the new properties like this " [prop] :[#]"
        $.each(objectData, function (index, value) {

            var property = this.Properties[selectedOption];
            
           
            labelCount[property] = (labelCount[property] || 0) + 1;

        });
    
    
        for (var name in labelCount) {
            
            if(name !="null"){
            //Aqui se agregan las filas nivel 1 (contienen los nombres de la clase)
            html+='<tr class="level1" ><td style="background-color:rgba(69, 106, 176,0.4); border:2px solid rgba(69, 106, 176,0.75);text-align:center;padding: 3px 10px 3px 10px;">'+name+'</td>';/*<td style="background-color:#F2F3FF; border:2px solid black;text-align:center;">'+selectedOptionText+'</td>';*/
            
            var control= 0;
            
            $.each(objectData, function(index2, value2){
                
                
                if(value2.Properties[selectedOption]==name){
                    control+=1;
                          
                    if(control==1){
                        
                        
                        $('.tablecheckbox').each( function(){
                            if($(this).prop('checked'))
                                {
                                    
                                    var id= $(this).attr("id");
                                    html+='<td style="background-color:rgba(69, 106, 176,0.4); border:2px solid rgba(69, 106, 176,0.75);text-align:center;padding: 3px 10px 3px 10px;">'+$('label[for="'+id+'"]').text()+'</td>';
                               
                                }
                        });
                        control+=1;
                    }
                    html+='</tr>';
                   
                        
                
                    //Aqui se agregan las filas nivel 2 (contienen datos dentro de cada clase)
                    html+='<tr class="level2" style="border:1px solid black;" ><td style="border:1px solid black;background-color:white;padding: 3px 10px 3px 10px;"><a href="'+value2.Link+'">-'+value2.Name+'</a></td>';/*<td style="border:1px solid black;text-align:center;">'+value2.Properties[selectedOption]+'</td>';*/

                    $('.tablecheckbox').each( function(){
                            if($(this).prop('checked'))
                                {
                                    
                                    var tdvalue= $(this).val();
                                    html+='<td style="border:1px solid black;text-align:center;padding: 3px 10px 3px 10px;">'+value2.Properties[tdvalue]+'</td>';
                               
                                }
                        });
                
                    html+='</tr>';
                }
                
               
            });
        }
            
        }
          
    $('#tablecontainer tbody').html('');
    $('#tablecontainer tbody').append(html);
        }
    else if(intervalData!=null)
        {
            
            var valueshtml=""
              $.each(intervalData, function(index, value){
        
        var min= value[0], max= value[1];
                  
                valueshtml+='<tr class="level1"><td style="background-color:rgba(69, 106, 176,0.4); border:2px solid rgba(69, 106, 176,0.75);text-align:center;padding: 3px 10px 3px 10px;">['+min+'-'+max+']</td>';//<td style="background-color:#F2F3FF; border:2px solid black;text-align:center;">'+selectedOptionText+'</td>';
          
                        //$.each mode with new settings
                        $('.tablecheckbox').each( function(){
                            if($(this).prop('checked'))
                                {
                                    
                                    var id= $(this).attr("id");
                                    valueshtml+='<td style="background-color:rgba(69, 106, 176,0.4); border:2px solid rgba(69, 106, 176,0.75);text-align:center;padding: 3px 10px 3px 10px;">'+$('label[for="'+id+'"]').text()+'</td>';
                               
                                }
                        });
              
                  
                  valueshtml+='</tr>';
        $.each(objectData,function(index2, value2){ 
            
         
            
            
        var number= value2.Properties[selectedOption];
            
         if( number>=min && number<=max ){
             
              valueshtml+='<tr class="level2"><td style="border:1px solid black; background-color:white;padding: 3px 10px 3px 10px;"><a href="'+value2.Link+'">-'+value2.Name+'</a></td>';//<td style="border:1px solid black; text-align:center;">'+value2.Properties[selectedOption]+'</td>';
                  
              $('.tablecheckbox').each( function(){
                            if($(this).prop('checked'))
                                {
                                    
                                    var tdvalue= $(this).val();
                                    valueshtml+='<td style="border:1px solid black;text-align:center;padding: 3px 10px 3px 10px;">'+value2.Properties[tdvalue]+'</td>';
                               
                                }
                        });     
             
                  valueshtml+='</tr>';
         }
              
        });
        
    });
    
         
            $('#tablecontainer tbody').html('');
    $('#tablecontainer tbody').append(valueshtml);
            
        }
    

    
}


    //Esta función cuenta con sub funciones que actúan según el tipo de gráfica deseada(count, value)
function displayChart(filteredStructure, canvasID) {


        //En labels tienen que ir las etiquedas de la parte inferior de la gráfica (aplica para: graficos de barras,);
        var data = {
            labels: []
            , datasets: [
                {
                    label: "Yo"
                    , fillColor: "rgba(69, 106, 176,0.5)"
                    , strokeColor: "rgba(69, 106, 176,0.8)"
                    , highlightFill: "rgba(69, 106, 176,0.75)"
                    , highlightStroke: "rgba(69, 106, 176,1)"
                    , data: []
        }
    ]
        };
        var dataarray=[];
        
   		    
            filteredStructure.sort(function(a, b){
              
              if(a.Properties[$('#mysecondpicklist').val()]>b.Properties[$('#mysecondpicklist').val()] )
                {
                  return 1;
                }
              
              if(a.Properties[$('#mysecondpicklist').val()]<b.Properties[$('#mysecondpicklist').val()] )
                {
                  return -1;
                }
              
              return 0;
            });
  		
        switch($('#myPickList').val()){
                
            case "Count":
                 data = countGraph(data, filteredStructure);
                tableFunction(filteredStructure, null);
            $('#chartTitle').text($('#chartTitle').text()+" Chart ("+ filteredStructure.length+" Records)");
                break;
                
            case "Values":
                
                dataarray=NEWVALUESGRAPH(data, filteredStructure);
                 data= dataarray[0];             
                tableFunction(filteredStructure, dataarray[1]);
            $('#chartTitle').text($('#chartTitle').text()+" Chart ("+ filteredStructure.length+" Records)");
                break;
        }
    
    
    //check if data contains any label and values. If not, create values for them to display "no records"
    if(data.labels[0]==undefined){
        
        data.labels[0]="No values";
        data.datasets[0].data[0]="0";
    }
            //Destroy and re-create the canvas and create chart instance for it
           
        $('#' + canvasID).remove();
        $('#canvascontainer').append('<canvas id="' + canvasID + '" width="400" height="400"></canvas>')

        var context = document.getElementById(canvasID).getContext("2d");
        var chartInstance = new Chart(context).Bar(data);
        return chartInstance;

    }


function clearNulls(filteredStructure, propSelection) {


        for (var i = filteredStructure.length; i > 0; i--) {

            //   console.log(filteredStructure[i - 1].Properties[propSelection]);
            if (filteredStructure[i - 1].Properties[propSelection] == null || filteredStructure[i - 1].Properties[propSelection] == undefined) {
                filteredStructure.splice(i - 1, 1);

            }


        }
        return filteredStructure;
    }

    $(function () {
        
        var objectName="", checkboxText=[], checkboxSelection=[];

        $('.object').on("click", function () {
            $('.objectselect').hide(300);
            objectName = $(this).text();
          $('#chartTitle').text(objectName);
            $('#titlecontainer').append('<button type="button" class="erase btn btn-link btn-small" style="display:inline;">↵ Back</button>');
            
            checkboxText= checkboxList(objectName);
            tableCheckboxes(checkboxText);
            switch (objectName) {

            case "Account":

                var jsonObject = $.parseJSON(accountString);

                break;

            case "Contact":
                var jsonObject = $.parseJSON(contactString);
                  
                break;

            case "Staff":
                var jsonObject = $.parseJSON(userString);
                break;

            case "Opportunity":
                var jsonObject = $.parseJSON(opportunityString);
                break;
                
                case "Product":
                var jsonObject = $.parseJSON(productString);
                break;
                
                case "Campaign":
                var jsonObject = $.parseJSON(campaignString);
                break;

            }

            var jsonObjectCopy = jsonObject;


            var allowNulls = $('#nullCheckbox:checked').length;
            /*  if (allowNulls != 0) {

                  jsonObjectCopy = clearNulls(jsonObjectCopy, selectedOption);

              }*/
            $('.objectshow').show();
           
            
            
            $('#myPickList').on("change", function () {
                
               if($(this).val()!="Null"){
                	 picklistContents(objectName,$(this).val());
                    $('#chartTitle').text(objectName+' '+$(this).val());
                   
               }
                
            });
            
            $('#secondpicklist').on("change", function(){
                
                 
                if($(this).val()!="Null"){
                  $('#chartTitle').text(objectName+' '+$('#secondpicklist option:selected').text()+' '+$('#myPickList').val());  
                var myChart = displayChart(jsonObjectCopy, "reportChart");  
               $('.filtercontainer').show(600);
               
                }
              else{
                $('#checkboxcontainer').hide();
                $('canvas').hide(600,function(){
                  $('canvas').remove();
                });
                $('.filtercontainer').hide(600);
                  
                 $('.datefilter').each(function(){
                    var filterid= $(this).attr("id");
                     $(document).off('change','#'+filterid+' select');
                     $(this).remove();
                 });
                  
                  $('.rangefilter').each(function(){
                    var filterid= $(this).attr("id");          
                     $(document).off('change','#'+filterid+' select');
                     $(this).remove();
                 });
                  
                $('#tablecontainer tbody').html('');
              }
               
                
            });
            

            
            jsonObjectCopy = jsonObject;
            //        console.log(jsonObjectCopy);

            
            
       $(document).on('change','.datefilter input, .rangefilter input',function(){
               
           var parentid= $(this).parent().attr("id");
            
                if($('.'+parentid+'a').val()!="" && $('.'+parentid+'b').val()!="" && $('#'+parentid+' select').val()!="Null"){
                    
                    
                    
                     $('#chartTitle').text('');
                $('#chartTitle').text("Filtered "+objectName);
                    
                    console.log("this should be filtered");
                    
                    jsonObjectCopy= filterDataFunc(jsonObjectCopy);
                    var myFilteredChart = displayChart(jsonObjectCopy, "reportChart");  
                    
                    jsonObjectCopy=jsonObject;
                    
                }
               
                
            });
            
            $(document).on('click', '.tablecheckbox', function(){
               
                if($('.filtercontainer input').length==0){
                    $('#secondpicklist').trigger("change");
                }
               else{
                   $('.filtercontainer input').trigger("change");
               }
            });
            
        });
        
        
              
            //Here goes the event that fires the filtering function and the display of the chart after being filtered
            
        
        
            $('#addDateFilter').on('click',function(){
                
                addFilterFields("Date", objectName);
            });
        
        $('#addRangeFilter').on('click',function(){
                
                addFilterFields("Range", objectName);
            });
        
        
        
        //Remove filters handler
        $(document).on('click','.removefilter',function(){
           
            
            
            var parent= $(this).parent();
            var parentid= parent.attr("id");
            
            if(parent.hasClass("datefilter")){
                
                if($('.datefilter').length>1){
 $('#addDateFilter').show(700);
            }
                
            }
            
            if(parent.hasClass("rangefilter")){
                
                if($('.rangefilter').length>1){
 $('#addRangeFilter').show(700);
            }
                
            }
            
           parent.hide(700, function(){
               
               parent.remove();
    
           });   
            
            
            
            $(document).off("change",'#'+parentid+' select');
        });
        
        
        
       $(document).on('click', '.erase', function () {
           
           	$('option[value="Null"]').prop("selected",true);
           	$('.parameter').val('');
          	$('.filtercontainer').hide(600);
    		$('canvas').remove();
  			$(this).remove();
  			$('.objectshow').hide();
            $('.objectselect').show();
         	$('.datefilter').remove();
         	$('.rangefilter').remove();
  			$(document).off('change');
           $('#tablecontainer tbody').html('');
         $('#chartTitle').text('');
           $('#checkboxcontainer').hide();
           
        });  
    
    });
