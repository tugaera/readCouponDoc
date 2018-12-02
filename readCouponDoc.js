//var XMLHttpRequest = XMLHttpRequest;
//'use strict';

class rowDoc {
    constructor() {
        this.categoria = null;
        this.comeca = null;
        this.termina = null;
        this.sku = null;
        this.produto = null;
        this.link = null;
        this.armazem = null;
        this.preco = null;
        this.cupao = null;
        this.unidades = null;
        this.img = null;
    }
}

class LibReadCouponDoc {
    constructor(_file, _api, _header = null) {
        this._file = _file;
        this._api = _api;
        var _type = 'text/csv';
        this._type = _type;
        var _url = 'https://www.googleapis.com/drive/v3/files/'
        this._url = _url;
        var _data = null;
        this._data = _data;
        this._header = _header;
    }
    
    set url(url) {
        this._url = url;
    }

    get url() {
        return this._url;
    }

    get data() {
        return this._data;
    }

    set header(header) {
        this._header = header;
    }

    /**
     * getFile()
     * @param {*} date1 
     * @param {*} date2 
     */
    getFile(date1, date2 ) {
        const url = this.url + this._file + '/export?key=' + this._api+ '&mimeType='+this._type;
        const xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        var doc = xmlhttp.responseText;
        this._data = doc.split('Dia ' + date1)[1].split('Dia ' + date2)[0];
        return this._data;
    }
    /**
     * getImage()
     * @param {*} url 
     */
    getImage(url){
        var xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        var data = xmlhttp.responseText;
    
        var imgLink = null;
    
        var doc = document.implementation.createHTMLDocument();  
        try {
            doc.body.innerHTML = data;
            imgLink = doc.querySelector("meta[itemprop='image']").getAttribute("content");
        }catch(e) {
            console.log('getImage() - error: ', e);
        }
        // console.log('imgLink', imgLink);
        return imgLink;
        //image
    }

    /**
     * createTable() - Criar uma tabela a partir do array
     * @param {*} data table array data
     * @param {*} idTable id of the table
     * @param {*} img boolean with img or not
     */
    createTable(data, idTable, img = false) {
        var table = document.getElementById(idTable);

        //or use :  var table = document.all.tableid;
        for(var i = table.rows.length; i >= 0; i--)
        {
            table.deleteRow(i-1);
        }
        //table.deleteTHead()
        
        if(data.length > 0 && !(table.tHead)) {
            var thead = document.createElement("thead");
    
            for (var key in data[0]) {
                var th = document.createElement("th");
                var txt = document.createTextNode(key);
                th.appendChild(txt);
                thead.appendChild(th);
            }
            table.appendChild(thead);
        }
        var tbody = document.createElement("tbody");
        for (var i in data) {
            
            var tr = document.createElement("tr");
            var flag = true;
            for (var key in data[i]) {
                var td = document.createElement("td");
                var txt = null;
                if(img && key == 'img'){
                    txt = document.createElement("IMG");
                    txt.setAttribute("src", data[i][key]);
                    txt.setAttribute("width", "100");
                    txt.setAttribute("height", "100");
                    txt.setAttribute("alt", "");
                } else
                    txt = document.createTextNode(data[i][key]);
                if(key == 'cupao' && !(data[i][key]))
                    flag = false;
                td.appendChild(txt);
                tr.appendChild(td);
            }
            if(flag)
                tbody.appendChild(tr);
        }
        table.appendChild(tbody);
    }
    /**
     * readCSV()
     * @param {*} data  
     * @param {*} img
     */
    readCSV(data, img = false) {
        var allTextLines = data.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];
        for (var i=1; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
            if (data.length == headers.length) {
                var row = new rowDoc();
                for(var _i=0; _i<headers.length; _i++) {
                    let column = this._header[x];
                    if(cells[x] != null && typeof cells[x] == "string" && cells[x] !== '' && typeof row["column"] == "undefined")
                        row[column] = cells[x];
                }
                if(img && row.link != null)
                    row.img = this.getImage(row.link);
                lines.push(row);
            }
        }
        return lines;
    }

    /**
     * readTable()
     * @param {*} data 
     * @param {*} img 
     */
    readTable(data, img = false) {
        let rows = data.split("\n");
        let table = [];
        for(let y in rows) {
            let cells = rows[y].split("\t");
            let row = new rowDoc();
            let flag = true;
            for(let x in cells) {
                let column = this._header[x];
                if(cells[x] != null && typeof cells[x] == "string" && cells[x] !== '' && typeof row["column"] == "undefined")
                    row[column] = cells[x];
            }
            if(img && row.link != null)
                row.img = this.getImage(row.link);

            if(flag)
                table.push(row);
        }
        return table;
    }
}

//export default LibReadCouponDoc;
/*const instance = new LibReadCouponDoc();
export { instance as LibReadCouponDoc };*/
//exports.default = LibReadCouponDoc;
exports.LibReadCouponDoc = LibReadCouponDoc;

