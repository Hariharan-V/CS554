const templateHelp = {
    beforetitle: '<!doctype html>\n'+
                '<html lang="en">\n'+
                '<head>\n'+
                '<meta charset="utf-8">\n'+
                '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n'+
                '<style>\n'+
                'h1{\n'+
                '    color: green;\n'+
                '}\n'+
                'h2{\n'+
                '    color: orange;\n'+
                '}\n'+
                'h3{\n'+
                '    color: yellowgreen ;\n'+
                '}\n'+
                'h4{\n'+
                '    color: rgb(62, 75, 35) ;\n'+
                '}\n'+
                'p{\n'+
                '    color:  rgb(35, 131, 131);\n'+
                '}\n'+
                'a{\n'+
                '    color: blue;\n'+
                '}\n'+
                
                '</style>\n',
    
    aftertitle: '</head>\n'+
                '<body>\n',
    afterbody:  '</body>\n'+
                '</html>\n'
}

const constructHTML = (title,body)=>{
    return templateHelp.beforetitle+'<title>'+title+'</title>\n'+templateHelp.aftertitle+body+templateHelp.afterbody;
}
export default {constructHTML: constructHTML};