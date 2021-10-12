 /*
  * Infragistics WebGrid CSOM Script: ig_WebGrid_cb.js
  * Version 7.1.20071.40
  * Copyright(c) 2001-2006 Infragistics, Inc. All Rights Reserved.
  */
 
// ig_WebGrid_cb.js
// Infragistics UltraWebGrid Script 
// Copyright (c) 2001-2007 Infragistics, Inc. All Rights Reserved.
function _igtbl_determineEditorPosition(g,gn,cellObj,cElem,cell)
{
	var r=igtbl_getAbsBounds(cElem, g, true);
	var z=igtbl_getElementById(gn+"_main");
	if(z!=null)
		z=z.zIndex;
	z=(z!=null&&z!=""&&z>999)?z+1:9999;
	var offsWidth=cElem.offsetWidth;
	var offsHeight=cElem.offsetHeight;
	if(g.IsXHTML)
	{
		offsWidth=cElem.clientWidth;
		offsHeight=cElem.clientHeight;
	}
	
	var w=(g.DivElement.clientWidth&&g.DivElement.clientWidth<offsWidth?g.DivElement.clientWidth:offsWidth)-2,
		h=(g.DivElement.clientHeight&&g.DivElement.clientHeight<offsHeight?g.DivElement.clientHeight:offsHeight)-2,
		ch=cElem.clientHeight;
	if(ch==null||ch==0)
	{
		w--;
		h--;
	}
	if(w<5)
		w=5;
	if(h<5)
		h=18;
	r.w=w;
	r.h=h;
	r.z=z;
	if((z=ig_csom.AgentName.indexOf("netscape/7.0"))>0)
	{
		r.x++;
		r.y++;
	}

	if(cellObj.Row.IsFilterRow)
	{
	    
	    var buttonShift = cell.childNodes[0];
	    buttonShift = buttonShift.offsetLeft + buttonShift.offsetWidth;
	    if (buttonShift < r.w)
	    {
	        r.w -= buttonShift;
	        r.x += buttonShift;
	    }
	}	
	return r;
}

function igtbl_editCell(evnt,gn,cell,key)
{
	var g=igtbl_getGridById(gn);
	if(g==null || !g.isLoaded())
		return;
	g.event=evnt;
	if(g._editorCurrent!=null)
		igtbl_hideEdit(null,null,g);
	var cellObj=igtbl_getCellById(cell.id);
	var cElem=cellObj.getElement();
	if(cellObj==null)
		return;
	
	if((g._exitEditCancel && !g._returnToEditModeFromScroll) || !cellObj.isEditable())
	{
		return;
	}
	
	if(cellObj.Row.Band.getCellClickAction()==1 || cellObj.Row.Band.getCellClickAction()==3)
	{
		if(cellObj!=g.oActiveCell)
			g.setActiveCell(cellObj);
	}
	else if(cellObj.Row.Band.getCellClickAction()==2)
	{
		if(cellObj.Row!=g.oActiveRow)
			g.setActiveRow(cellObj.Row);
	}
	var col=cellObj.Column;
	if(col.ColumnType==3)
	{
	
	
		
		var chBx=cell.firstChild;
		if(chBx.tagName!="INPUT")
			chBx=chBx.firstChild;
		if(chBx.tagName=="INPUT")
			try
			{
				chBx.focus();
				if(!chBx.getAttribute("gn"))
				{
					ig_csom.addEventListener(chBx,"keydown",igtbl_inputEvt);
					chBx.setAttribute("gn",gn);
					chBx.setAttribute("cellId",cell.id);
				}
			}
			catch(exception){;}
		return;
	}
	if(col.ColumnType==7)
		return;
	if(igtbl_fireEvent(gn,g.Events.BeforeEnterEditMode,"(\""+gn+"\",\""+cell.id+"\")")==true)
		return;
	cellObj.scrollToView();
	var r=_igtbl_determineEditorPosition(g,gn,cellObj,cElem,cell);
	
	var css=null,e=cell,i=0;
	while(++i<10&&(css==null||css==""))
		if((e=e.parentNode)!=null)
			css=e.getAttribute("bandNo");
	if(css!=null&&css!="")
		css=igtbl_getEditCellClass(gn,css);
	if(!css)css="";
	
	var v=(key!=null&&key>0&&key!=113)?"":cellObj.getValue();
	if(v==null)
		if((v=cell.getAttribute(igtbl_sUnmaskedValue))==null)
			v="";
	var href=-1,nn=cElem.childNodes;
	for(z=0;z<nn.length;z++)
		if(nn[z].tagName=="A")
			href=z;
	g._editorCustom=null;
	var elem=igtbl_editCust(g,(key!=null&&key>0&&key!=113)?"":v,r,col,cElem);
	
	v=cellObj.Node?igtbl_getNodeValue(cellObj.Node):(cell.getAttribute(igtbl_sigDataValue)?unescape(cell.getAttribute(igtbl_sigDataValue)):v.toString());
	if(!elem)
		elem=igtbl_editList(g,v,r,col,cElem);
	if(!elem)
	{
		elem=igtbl_editDef(g,v,r,col,css,cell,cElem);
		if(elem)
		{
			
			var keyupHandled=elem.getAttribute("_igkeyupevent");
			if(cellObj.Row.IsFilterRow)
			{
				if(!keyupHandled)
				{
					ig_csom.addEventListener(elem,"keyup",igtbl_stringEditorKeyPress);
					elem.setAttribute("_igkeyupevent","true");
				}	
			}
			else
			{
				if(keyupHandled)
				{
					ig_csom.removeEventListener(elem,"keyup",igtbl_stringEditorKeyPress);
					elem.removeAttribute("_igkeyupevent");
				}
			}
		}
		else
		{
			return;
		}    
    }

	cellObj._oldValue=v;
	if(href>=0)
		elem.setAttribute("hasHref",href);
	g._editorCurrent=elem;
	elem.setAttribute("gn",gn);
	elem.setAttribute("currentCell",cell.id);
	igtbl_fireEvent(gn,g.Events.AfterEnterEditMode,"(\""+gn+"\",\""+cell.id+"\");");
	if(typeof(Page_Validators)!="object")
		return;
	var i,j,id=null,colV=col.Validators,pgV=Page_Validators;
	if((e=col.getEditorControl())!=null)
		if((id=e.ID)==null)
			if((id=e.id)==null)
				id=e.Id;
	if(id==null)
		id=elem.id;
	else
		for(i=0;i<pgV.length;i++)
		{
			if(pgV[i]&&pgV[i].controltovalidate==id)
			{
				if(!colV)colV=col.Validators=new Array();
				for(j=colV.length-1;j>=0;j--)if(colV[j]==pgV[i].id)break;
				if(j<0)colV[colV.length]=pgV[i].id;
			}
		}
	for(i=0;i<colV.length;i++)
	{
		if((v=igtbl_getElementById(colV[i]))==null)
			continue;
		
		if(v.parentNode!=document.body)
			document.body.insertBefore(v,document.body.firstChild);
		s=v.style;
		s.zIndex=9999;
		s.position="absolute";
		v.style.left=r.x+"px";
		v.style.top=(r.y+r.h+2)+"px";
		try
		{
			v.unselectable="on";
		}catch(ex){;}
		if(e!=null)
			continue;
		
		if(ig_csom.IsNetscape6)
			v.controltovalidate=id;
		else
			v.setAttribute("controltovalidate",id);
		ValidatorHookupControlID(id,v);
	}
	for(i=0;i<pgV.length;i++)
		if(pgV[i].controltovalidate==id)
			for(j=0;j<colV.length;j++)
				if(pgV[i].id==colV[j])
					pgV[i].enabled=pgV[i].isvalid=true;
}

function igtbl_editCust(g,v,r,col,cElem)
{
	var id=col.EditorControlID,editor=col.getEditorControl();
	if(editor==null && id!=null)
	{
		if((editor=igtbl_getElementById(id))!=null)
			editor=editor.Object;
	}
	if(editor==null)
		return null;
	col.editorControl=editor;
	var elem=editor.Element;
	g._ensureValidParent(editor);
	editor.setValue(v,false);
	elem.style.zIndex=r.z;
	if (elem.tagName=="INPUT")
	{
		
		if(g.IsXHTML)
		{
			
			r.x-=2;
			r.y-=2;
			
			var cStyle,eStyle;
			var wd=0,hd=0;
			if(ig_csom.IsIE)
			{
				cStyle=cElem.currentStyle;
				eStyle=elem.currentStyle;
				wd=igtbl_parseInt(cStyle.borderLeftWidth)+igtbl_parseInt(cStyle.borderRightWidth)-igtbl_parseInt(eStyle.borderLeftWidth)-igtbl_parseInt(eStyle.borderRightWidth);
				hd=igtbl_parseInt(cStyle.borderTopWidth)+igtbl_parseInt(cStyle.borderBottomWidth)-igtbl_parseInt(eStyle.borderTopWidth)-igtbl_parseInt(eStyle.borderBottomWidth);
			}
			else
			{
				cStyle=cElem.style;
				eStyle=elem.style;
				wd=igtbl_parseInt(cStyle.borderLeftWidth)+igtbl_parseInt(cStyle.borderRightWidth)-igtbl_parseInt(eStyle.borderLeftWidth)-igtbl_parseInt(eStyle.borderRightWidth);
				hd=igtbl_parseInt(cStyle.borderTopWidth)+igtbl_parseInt(cStyle.borderBottomWidth)-igtbl_parseInt(eStyle.borderTopWidth)-igtbl_parseInt(eStyle.borderBottomWidth);
			}
			
			var pd=eStyle.paddingLeft;
			if(pd && pd.length>2 && pd.substr(pd.length-2,2)=="px")
				wd-=igtbl_parseInt(pd)-1;
			pd=eStyle.paddingRight;
			if(pd && pd.length>2 && pd.substr(pd.length-2,2)=="px")
				wd-=igtbl_parseInt(pd)-1;
			pd=eStyle.paddingTop;
			if(pd && pd.length>2 && pd.substr(pd.length-2,2)=="px")
				hd-=igtbl_parseInt(pd)-1;
			pd=eStyle.paddingBottom;
			if(pd && pd.length>2 && pd.substr(pd.length-2,2)=="px")
				hd-=igtbl_parseInt(pd)-1;
			if(wd)
				r.w+=wd;
			if(hd)
				r.h+=hd;
			if(r.w<0)r.w=1;
			if(r.h<0)r.h=1;
		}
		else
		{
			
			var frameBorderZero = (window.frameElement && window.frameElement.frameBorder == "0");
			if(ig_csom.IsIE && frameBorderZero) 
			{
				r.x+=2;
				r.y+=2;
			} 
			
			else if(ig_csom.IsFireFox) 
			{
				r.x+=1;
				r.y+=1;
			}
		}
		
	}
	editor.setVisible(true,r.x,r.y,r.w,r.h);
	editor.webGrid=g;
	editor.addEventListener("blur",igtbl_hideEdit,g);
	editor.addEventListener("keydown",igtbl_hideEdit,g);
	elem.setAttribute("editType",4);
	g._editorCustom=editor;
	return elem;
}

function igtbl_editDef(g,v,r,col,css,cell,cElem)
{
	var elem=g._editorInput,nn=cElem.childNodes;
	var area=(col.CellMultiline==1)?1:0;
	if(area==1)
		elem=g._editorArea;
	var w=cElem.offsetWidth,h=cElem.offsetHeight,ie=ig_csom.IsIE;
	var s,i=ie?0:nn.length;
	while(i-->0)
	{	
	    var curElem=nn[i];
        if (!cell.Object.Row.IsFilterRow || curElem.tagName!="BUTTON")
        {
		    if(curElem.style)
			    curElem.style.display="none";
	        else
	        {
		        if(g._oldElems==null)
			        g._oldElems=new Array();
		        g._oldElems[g._oldElems.length]=curElem;
		        cElem.removeChild(curElem);
	        }
        }
	}
	var justCreated=false;
	if(!elem)
	{
		if(area==1) {
			g._editorArea=elem=document.createElement("TEXTAREA");
			
			ig_csom.addEventListener(g._editorArea,"keypress",_igtbl_textareaEditorKeyPress);
			ig_csom.addEventListener(g._editorArea,"paste",_igtbl_textareaEditorPaste);
			ig_csom.addEventListener(g._editorArea,"input",_igtbl_textareaEditorInput);
		}
		else
		{
			g._editorInput=elem=document.createElement("INPUT");
			elem.type="text";
		}
		if(ie)
			document.body.insertBefore(elem,document.body.firstChild);
		else
			cElem.appendChild(elem);
		ig_csom.addEventListener(elem,"keydown",igtbl_editEvt);
		ig_csom.addEventListener(elem,"keyup",igtbl_editEvt);
		ig_csom.addEventListener(elem,"blur",igtbl_editEvt);
		elem.setAttribute("editType",area);
		i=g.Id+((area==1)?"_ta":"_tb");
		elem.id=i;
		justCreated=true;
	}
	else if(!ie)
		cElem.appendChild(elem);
	elem.value="";
	if(css.length>0)
		elem.className=css;
	s=elem.style;
	var eStyle=(ie?elem.currentStyle:elem.style);
	s.zIndex=r.z;
	
	if(ig_csom.IsIE && g.IsXHTML)
	{
		r.x--;
		r.y--;
		var edLeftWidth=igtbl_parseInt(eStyle.borderLeftWidth);
		var edRightWidth=igtbl_parseInt(eStyle.borderRightWidth);
		var edTopWidth=igtbl_parseInt(eStyle.borderTopWidth);
		var edBottomWidth=igtbl_parseInt(eStyle.borderBottomWidth);
		if(edLeftWidth || edRightWidth)
		{
			var wd=igtbl_parseInt(cElem.currentStyle.borderLeftWidth)+igtbl_parseInt(cElem.currentStyle.borderRightWidth)-edLeftWidth-edRightWidth;
			if(wd)
				r.w+=wd;
		}
		else
		{
			var wd=igtbl_parseInt(cElem.currentStyle.borderLeftWidth);
			if(wd)
				r.x+=wd;
		}
		if(edTopWidth || edBottomWidth)
		{
			var hd=igtbl_parseInt(cElem.currentStyle.borderTopWidth)+igtbl_parseInt(cElem.currentStyle.borderBottomWidth)-edTopWidth-edBottomWidth;
			if(hd)
				r.h+=hd;
		}
		else
		{
			var hd=igtbl_parseInt(cElem.currentStyle.borderTopWidth);
			if(hd)
				r.y+=hd;
		}
	}
	if(g.IsXHTML)
	{
		var wd=0;
		var hd=0;
		var pd=eStyle.paddingLeft;
		if(pd && pd.length>2 && pd.substr(pd.length-2,2)=="px")
			wd-=igtbl_parseInt(pd);
		pd=eStyle.paddingRight;
		if(pd && pd.length>2 && pd.substr(pd.length-2,2)=="px")
			wd-=igtbl_parseInt(pd);
		pd=eStyle.paddingTop;
		if(pd && pd.length>2 && pd.substr(pd.length-2,2)=="px")
			hd-=igtbl_parseInt(pd);
		pd=eStyle.paddingBottom;
		if(pd && pd.length>2 && pd.substr(pd.length-2,2)=="px")
			hd-=igtbl_parseInt(pd);
		if(wd)
			r.w+=wd;
		if(hd)
			r.h+=hd;
		if(r.w<0)r.w=1;
		if(r.h<0)r.h=1;
	}
	if(ie)
	{
		eStyle=elem.currentStyle;
		s.position="absolute";
		s.left=r.x+"px";
		s.top=r.y+"px";
		s.height=r.h+"px";
	}
	else
	{
		eStyle=elem.style;
		if(r.w>10)
		{
			if(g.IsXHTML)
				r.w-=igtbl_parseInt(cElem.style.paddingLeft)+igtbl_parseInt(cElem.style.paddingRight)+3;
			else
				r.w-=6;
		}
		s.height="";
	}
	s.width=r.w+"px";
	if(area==0)
	{
		i=col.FieldLength;
		elem.maxLength=(i!=null&&i>0)?i:2147483647;
	}
	if(area==1)
		s.overflow="auto";
	s.borderWidth=ig_csom.isEmpty(elem.className)?"0":"";
	s.display="";
	if(!ie)
	{
		cell.style.height=h+"px";
		for(i=1;i<8;i++)
			if(cElem.offsetWidth>w)
				cell.style.width=(w-i)+"px";
		s.height=(r.h-1)+"px";
		if(cElem.offsetHeight>h)
			s.height=(r.h-2)+"px";
	}
	elem.value=v;
	try
	{
		elem.select();
		elem.focus();
	}catch(e){;}
	return elem;
}

function _igtbl_textareaEditorKeyPress(evnt) {
	
    var textbox = igtbl_srcElement(evnt);
    var grid = igtbl_getGridById(textbox.id.substring(0, textbox.id.length - 3));
    var column = grid.getActiveCell().Column;
    
    if(column.FieldLength > 0) 
    {
        
        if(textbox.selectionStart != undefined) 
        {
           textbox.oldValue = textbox.value;
           textbox.oldSelectionStart = textbox.selectionStart;
           textbox.oldSelectionEnd = textbox.selectionEnd;
        }
        
        
        if(textbox.value.length >= column.FieldLength && !_igtbl_textareaHasSelection(textbox))
        {
            if(evnt && evnt.preventDefault) 
            {
                if(evnt.charCode != 0) 
                {
                    evnt.preventDefault();
                }
            }
            return false;
        }
    }
}

function _igtbl_textareaEditorPaste(evnt) {
	
	var textbox = igtbl_srcElement(evnt);
	var grid = igtbl_getGridById(textbox.id.substring(0, textbox.id.length - 3));
	var column = grid.getActiveCell().Column;
	
	if(column.FieldLength > 0) 
	{
		var text = window.clipboardData.getData("Text");
		var range = document.selection.createRange(); 
		var currentLength = textbox.value.length - range.text.length;

		if((currentLength + text.length)  > column.FieldLength) 
		{
			if((column.FieldLength - currentLength) > 0) 
			{
				range.text = text.substring(0, column.FieldLength - currentLength);
			}
			evnt.returnValue = false;
		}
	}
}

function _igtbl_textareaEditorInput(evnt) {
	
	var textbox = igtbl_srcElement(evnt);
	var grid = igtbl_getGridById(textbox.id.substring(0, textbox.id.length - 3));
	var column = grid.getActiveCell().Column;
	
	if(column.FieldLength > 0) 
	{
		if(textbox.value.length > column.FieldLength && textbox.value != textbox.oldValue
			 && textbox.value.length > textbox.oldValue.length) 
		{
			var beginning = textbox.oldValue.substring(0, textbox.oldSelectionStart);
			var end = textbox.oldValue.substring(textbox.oldSelectionEnd);
			var middle = textbox.value.substring(beginning.length, textbox.value.length - end.length);
		    
			
			var newLength = column.FieldLength - (beginning.length + end.length);
			middle = middle.substring(0, newLength);
			textbox.value = beginning + middle + end;
		    
			
			textbox.selectionBegin = beginning.length + middle.length;
			textbox.selectionEnd = textbox.selectionBegin;
		}

		textbox.removeAttributeNode("oldValue");
		textbox.removeAttributeNode("selectionStart");
		textbox.removeAttributeNode("SelectionEnd");
	}
}

function _igtbl_textareaHasSelection(textbox) {
	if(textbox.selectionStart != undefined) 
	{
		if(textbox.selectionEnd > textbox.selectionStart) 
		{
			return true;
		}
	} 
	else if(document.selection) {
		var selection = document.selection.createRange();
		if(selection && selection.text.length > 0) 
		{
			return true;
		}
	}
}

function igtbl_editEvt(evt,gn,id)
{
	if(evt==null)
		if((evt=window.event)==null)
			return;
	var src=evt.srcElement;
	if(src==null)
		if((src=evt.target)==null)
			return;
	if(!gn||!gn.substring)
		gn=src.getAttribute("gn");
	var g=igtbl_getGridById(gn);
	if(g==null)
		return;
	g.event=evt;
	var b=g._editorButton;
	switch(evt.type)
	{
		case "focus":return;
		case "blur":
			if(!src.getAttribute("noOnBlur"))
			{
				igtbl_hideEdit(null,evt,g);
			}
			else
				ig_cancelEvent(evt);
			return;
		case "keydown":
			src.setAttribute("noOnBlur",true);
			window.setTimeout("igtbl_cancelNoOnBlurTB('"+gn+"','"+src.id+"')",100);
			if(b!=src && igtbl_fireEvent(gn,g.Events.EditKeyDown,"(\""+gn+"\",\""+src.getAttribute("currentCell")+"\","+evt.keyCode+")")==true)
			{
				ig_cancelEvent(evt);
				return;
			}
			g._mouseDown=0;
			var key=evt.keyCode;
			var et=src.getAttribute("editType");
			if(key==9 || key==27 || key==13 && et!=1 && et!=3 || key==113)
			{
			
				src.removeAttribute("noOnBlur");
				if(!igtbl_hideEdit(null,evt,g) && key!=27)
					ig_cancelEvent(evt);
				igtbl_activate(gn);
			}
			if(evt.ctrlKey && key==86 || evt.shiftKey && key==45)
			{
				var cbStr=igtbl_getClipboardData();
				if(cbStr && cbStr.indexOf("\t")>=0)
				{
					if(!g.fireEvent(g.Events.ClipboardError,[g.Id,g.eClipboardError.Failure]))
						ig_cancelEvent(evt);
				}
			}
			return;
		case "keyup":
			igtbl_fireEvent(gn,g.Events.EditKeyUp,"(\""+gn+"\",\""+src.getAttribute("currentCell")+"\","+evt.keyCode+")");
			return;
	}
	if(b && g.ActiveCell && !igtbl_isFocus(gn,b))
		igtbl_showColButton(gn,"hide",true);
}

function igtbl_editList(g,v,r,col,cElem)
{
	var list=col.ValueList;
	if(list==null||list.length<1)return null;
	var s,elem=g._editorList;
	if(elem==null)
	{
		g._editorList=elem=document.createElement("SELECT")
		document.body.insertBefore(elem,document.body.firstChild);
		ig_csom.addEventListener(elem,"keydown",igtbl_editEvt);
		ig_csom.addEventListener(elem,"keyup",igtbl_editEvt);
		ig_csom.addEventListener(elem,"blur",igtbl_editEvt);
		elem.style.position="absolute";elem.style.zIndex=r.z;
		elem.setAttribute("editType",3);
		elem.id=g.Id+"_vl";		
		ig_csom.addEventListener(elem,"change",igtbl_dropDownChange);
	}
	s=elem.style;
	var opt,css=col.ValueListClass;
	if(ig_csom.notEmpty(css))
		elem.className=css;
	else
		elem.style.fontSize=((r.h-=4)<15)?(((r.h<9)?9:r.h)+"px"):"";
	elem.value=v;
	var i=elem.options.length, prompt=col.ValueListPrompt;
	while(i-->0)
		elem.removeChild(elem.options[i]);
	if(ig_csom.notEmpty(prompt))
	{
		elem.appendChild(opt=document.createElement("OPTION"));
		opt.text=opt.value=prompt;
	}
	while(++i<list.length)if(list[i]!=null)
	{
		elem.appendChild(opt=document.createElement("OPTION"));
		opt.value=list[i][0];
		opt.text=list[i][1];
		

		if(v!=null&&(v==list[i][0])){opt.selected=true;v=null;}
	}
	
	s.display="";
	s.visibility="hidden";
	
	if(g.IsXHTML)
	{
		var xd,yd,wd,hd;
		var cStyle,eStyle;
		if(ig_csom.IsIE)
		{
			eStyle=elem.currentStyle;
			cStyle=cElem.currentStyle;
			yd=Math.floor((igtbl_parseInt(cStyle.borderTopWidth)+igtbl_parseInt(cStyle.borderBottomWidth)+igtbl_parseInt(eStyle.borderTopWidth)+igtbl_parseInt(eStyle.borderBottomWidth))/2);
		}
		else
		{
			r.x--;
			r.y--;
			eStyle=elem.style;
			cStyle=cElem.style;
			hd=cElem.offsetHeight-r.h-1;
			r.w+=2;
		}
		xd=igtbl_parseInt(eStyle.borderLeftWidth);
		if(xd)
			r.x-=Math.floor(xd/2);
		if(yd)
			r.y+=yd;
		wd=igtbl_parseInt(cStyle.borderLeftWidth)+igtbl_parseInt(cStyle.borderRightWidth);
		if(wd)
			r.w+=wd;
		wd=igtbl_parseInt(eStyle.borderLeftWidth);
		if(wd)
			r.w+=wd;
		if(hd)
			r.h+=hd;
	}
	if(ig_csom.IsIE)
	{
		s.left="0px";
		s.top="0px";
	}
	s.left=r.x+"px";
	s.width=r.w+"px";
    
    if(! (g.IsXHTML && ig_csom.IsIE7))
    {
	    s.height=r.h+"px";
	}
	var so=igtbl_getStyleSheet(elem.className);
	if(so && so.verticalAlign=="top")
		s.top=r.y+"px";
	else if(so && so.verticalAlign=="bottom")
		s.top=r.y+r.h-elem.offsetHeight+"px";
	else
		s.top=r.y+r.h/2-elem.offsetHeight/2+"px";
	
	s.visibility="visible";
	elem.focus();
	return elem;
}

function igtbl_activate(gn)
{
	var x=0;
	var g=igtbl_getGridById(gn);
	if(g==null) 
		return;
	
	if(g._editorCurrent!=null)
	{
		try
		{
			if (g._editorCurrent.select)
			{
				g._editorCurrent.select();
			}
			g._editorCurrent.focus();
			return;
		}
		catch(e){;}
	}
	var b=igtbl_initButton(g),elem=g._focusElem;
	if(elem==null)
		try
		{	
			elem=document.createElement("INPUT");
			document.body.insertBefore(elem,document.body.firstChild);
			elem.setAttribute("gn",gn);
			ig_csom.addEventListener(elem,"keydown",igtbl_inputEvt);
			ig_csom.addEventListener(elem,"keyup",igtbl_inputEvt);
			ig_csom.addEventListener(elem,"focus",igtbl_inputEvt);
			ig_csom.addEventListener(elem,"blur",igtbl_inputEvt);
			
			ig_csom.addEventListener(document.body,"mouseup",igtbl_globalMouseUp);
			g._focusElem=elem;
			var s=elem.style;
			s.zIndex=-1;
			s.position="absolute";
			s.fontSize="2px";
			s.padding=s.width=s.height=s.border="0px";
			if(elem.offsetWidth>2)
				s.width="1px";
			if(elem.offsetHeight>2)
				s.height="1px";
			elem.tabIndex=g.DivElement.getAttribute("tabIndexPage");
		}
		catch(ex){;}
	if(elem==null)
		return;
	g._lastKey=0;
	if(!igtbl_isOk(g))
		return;
	igtbl_showColButton(gn,"hide",true);
	var cell=g.oActiveCell;
	if(cell!=null)
		cell=cell.Element;
	if(cell==null)
		cell=g.Element;
	var r=igtbl_getAbsBounds(cell, g, true);
	elem.style.left=(r.x-3)+"px";
	elem.style.top=(r.y-3)+"px";
	if(g._focus0)
		return;
	if(g._mouseDown==1)
	{
		g._mouseDown=0;
		try
		{
			window.setTimeout("try{igtbl_isFocus('"+gn+"');}catch(ex){;}",0);
		}catch(ex){;}
	}
	else
		igtbl_isFocus(gn);
}

function _igtbl_processUpdates(g,se)
{
    var ar=g.getActiveRow();
	if(ar && !igtbl_inEditMode(g.Id) && !igtbl_isAChildOfB(se,g.MainGrid))
	{
		var retmpl=igtbl_getElementById(ar.Band.RowTemplate);
		if(!retmpl || !igtbl_isAChildOfB(se,retmpl))
			if(ar.IsAddNewRow)
				ar.commit();
			else
			if(ar.processUpdateRow)
				ar.processUpdateRow();
	}
}

function igtbl_globalMouseUp(evt,gn)
{
	var g=igtbl_getGridById(gn?gn:igtbl_lastActiveGrid);
	if(!g) return;
	var se=igtbl_srcElement(evt);
    _igtbl_processUpdates(g,se);
	
	var resizeDiv=document.body.igtbl_resizeDiv;
	if(resizeDiv)resizeDiv.style.display="none";
	g.Element.removeAttribute("mouseDown");
}

function igtbl_isOk(g)
{
	var vis=true,e=g.Element;
	while((e=e.parentNode)!=null)
		
		if(e.tagName!=(igtbl_isXHTML?"HTML":"BODY")&&e.style!=null&&e.style.display=="none")
			vis=false;
	if((e=g._focusElem)!=null)if((e.style.display=="none")==vis)e.style.display=vis?"":"none";
	return vis;
}
function igtbl_isFocus(gn,b)
{
	var g=igtbl_getGridById(gn);
	if(g==null)
		return false;
	if(b)
		return g.oActiveCell!=null&&g.oActiveCell.Element.id==b.getAttribute("srcElement");
	
	var ae=g.oActiveCell;
	if(!ae)
		ae=g.oActiveRow;
	var nn=null;
	var activeElement=null;
	try{
		activeElement=document.activeElement;
		if (activeElement)
		    nn=activeElement.nodeName;
	}catch(e){;}
	
	
	
	var inputSelectButton=(nn=="INPUT" || nn=="TEXTAREA" || nn=="SELECT" || nn=="BUTTON");
	var internalObj=(activeElement!=null && inputSelectButton &&
	 ( ig_isAChildOfB(activeElement,g.Element) || ig_isAChildOfB(activeElement,g.MainGrid) )
	);
	
	var insideEl=(ae && activeElement && ig_isAChildOfB(activeElement,ae.Element)) 
				&& (inputSelectButton) 
				|| inputSelectButton && activeElement && activeElement.parentNode && 
				
				     ig_isAChildOfB(activeElement,igtbl_getElementById(g.UniqueID+"_pager"));
				    
	
	var templOpen=ae && ae.Band.RowTemplate && igtbl_getElementById(ae.Band.RowTemplate).style.display=="";
	
	
	
	
	
	if(g._editorCurrent==null && !insideEl && !templOpen && !internalObj && !(ig_csom.IsFireFox && ae && ae.Column && ae.Column.TemplatedColumn&2 && ae.Element.childNodes.length>0))
		try
		{
			g._focusElem.focus();
		}
		catch(ex){;}
	return false;
}
function igtbl_initButton(g)
{
	var b=g._editorButton;
	if(!b)
		if((g._editorButton=b=igtbl_getElementById(g.Id+"_bt"))!=null)
		{
		    
		    if (b.parentNode!=document.body )
		    {
		        var parentNode = b.parentNode;
		        parentNode.removeChild(b);
		        document.body.insertBefore(b,document.body.firstChild);
		    }
		    
			b.unselectable="on";
			b.tabIndex=-1;
			b.hideFocus=true;
			b.style.zIndex=9999;
			b.setAttribute("gn",g.Id);
			g._mouseWait=0;
			ig_csom.addEventListener(b,"mouseout",igtbl_editEvt);
		}
	return b;
}
function igtbl_inputEvt(evt,gn)
{
	if(gn!=null)
	{
		var g=igtbl_getGridById(gn);
		if(g==null)
			return;
		if(evt==null)
		{
			g._focus=g._focus0;
			return;
		}
		if(!g._focus)
			return;
		var e=new Object();
		e.shiftKey=evt==1;
		e.ctrlKey=evt==2;
		e.keyCode=9;
		if(g.getActiveCell()==null && g.getActiveRow()==null)
		{
			if(g.Rows!=null)
				if((e=g.Rows.getRow(0))!=null)
					if((e=e.getCell(0))!=null)
						e.activate();
			return;
		}
		igtbl_onKeyDown(e,gn,true);
		return;
	}
	if(evt==null)
		if((evt=window.event)==null)
			return;
	var src=evt.srcElement;
	if(src==null)
		if((src=evt.target)==null)
			return;
	var g=igtbl_getGridById(gn=src.getAttribute("gn")),key=evt.keyCode;
	if(g==null)
		return;
	switch(evt.type)
	{
		case "focus":
			if(!igtbl_isOk(g))
			{
				ig_cancelEvent(evt);
				return;
			}
			g._focus0=g._focus=true;
			break;
		case "blur":
			g._focus0=false;
			try
			{
				window.setTimeout("try{igtbl_inputEvt(null,'"+gn+"');}catch(ex){;}",0);
			}
			catch(ex)
			{
				g._focus=false;
			}
			
			break;
		case "keydown":
			var click=false,ac=g.oActiveCell,b=g._editorButton;
			if(ac&&(key==32||key==13))
				click=b?igtbl_isFocus(gn,b):(ac.Column.ColumnType==7&&ac.Column.CellButtonDisplay==1);
			g._mouseDown=0;
			if(click)
				igtbl_colButtonClick(evt,gn,b,ac.Element);
			if(key==9)
				try
				{
					
					if(src.tagName=="INPUT" && src.type=="checkbox")
					{
						igtbl_processTab(gn,evt,key,igtbl_getCellById(src.getAttribute("cellId")));
						ig_cancelEvent(evt);
						break;
					}
					src.removeAttribute("noOnBlur");
					if(g.oActiveCell && g.oActiveCell.getNextTabCell(evt.shiftKey,true) || g.oActiveRow && g.oActiveRow.getNextTabRow(evt.shiftKey))
					{
						ig_cancelEvent(evt);
						window.setTimeout("try{igtbl_inputEvt("+(evt.shiftKey?"1":(evt.ctrlKey?"2":"0"))+",'"+gn+"');}catch(ex){;}",10);
						break;
					}
				}
				catch(ex){;}
			else if(key==13||key==27)
			{
				src.removeAttribute("noOnBlur");
				if(igtbl_inEditMode(g.Id) && !igtbl_hideEdit(null,evt,g))
				{
					if(key!=27)
						ig_cancelEvent(evt);
					return;
				}
			}
			
			if(typeof(igtbl_onKeyDown)!="undefined")
				igtbl_onKeyDown(evt,gn,true);
			break;
		case "keyup":
			if(typeof(igtbl_onKeyUp)!="undefined")
				igtbl_onKeyUp(evt,gn);
			break;
	}
}

function igtbl_hideEdit()
{
	var oEvent=null,g=null,i=arguments.length,gn=arguments[0];
	if(i==1 && (gn!=null&&gn.substring))
		g=igtbl_getGridById(gn);
	if(i>2)
	{
		oEvent=arguments[i-2];
		g=arguments[i-1];
	}
	if(g==null)
		return false;
	var evt=oEvent,elem=g._editorCurrent,key=g._lastKey;
	if(i==1)
	{
		
		if (key==114) return false;
		if(key==9)
			try
			{
				window.setTimeout("try{igtbl_activate('"+gn+"');}catch(ex){;}",10);
				return false;
			}
			catch(ex){;}
		if(key==9||key==13||key==27)
		{
			igtbl_activate(gn);
			return false;
		}
		evt=null;
	}
	if(elem==null || elem.getAttribute("noOnBlur")) 
		return false;
	var oEditor=(i==1||gn==null)?g._editorCustom:gn;
	gn=g.Id;
	if(oEditor!=null&&evt!=null)
		evt=evt.event;
	key=-3;
	if(evt!=null && evt.type=="keydown")
		g._lastKey=key=evt.keyCode;
	if(evt!=null)
		if((key==13 && (evt.shiftKey || evt.ctrlKey)) || (key!=-3 && key!=9 && key!=13 && key!=27 && key!=113))
			return false;
	var cell=igtbl_getElementById(elem.getAttribute("currentCell"));
	if(cell==null)
		return false;
	var cellObj=igtbl_getCellById(cell.id);
	if(cellObj==null)
		return false;
	var type=elem.getAttribute("editType"),v=(oEditor!=null)?oEditor.getValue():elem.value;
	var j,colV,pgV=null,valid=(typeof(Page_Validators)!="object");
	if(!valid)
	{
		valid=true;colV=cellObj.Column.Validators;pgV=Page_Validators;
		for(j=0;j<colV.length;j++)for(i=0;i<pgV.length;i++)if(pgV[i].id==colV[j])
		{
			ValidatorValidate(pgV[i]);
			if(!pgV[i].isvalid)valid=false;
		}
		if(!valid)
		{
			var de=g.getDivElement();
			de.setAttribute("noOnScroll","true");
			de.setAttribute("oldSL",de.scrollLeft.toString());
			de.setAttribute("oldST",de.scrollTop.toString());
		}
		else
			igtbl_cancelNoOnScroll(gn);
	}
		
	

	if (!valid && typeof(Page_Validators)!="undefined")
	{
		ValidatorUpdateIsValid();
			
	}

	
	elem.setAttribute("noOnBlur",true);
	if(!valid || g.fireEvent(g.Events.BeforeExitEditMode,[gn,cell.id,v])==true)
	{
		
		window.setTimeout("igtbl_clearNoOnBlurElem('"+elem.id+"')",100);
		if(!g._exitEditCancel&&!g._insideSetActive)
		{
			g._insideSetActive=true;
			igtbl_setActiveCell(gn,cell);
			g._insideSetActive=false;
		}
		g._exitEditCancel=true;
		return false;
	}
	elem.removeAttribute("noOnBlur");
	if(pgV!=null)for(i=0;i<pgV.length;i++)for(j=0;j<colV.length;j++)
		if(pgV[i].id==colV[j]&&pgV[i].enabled)
			ValidatorEnable(pgV[i],false);
	elem.removeAttribute("currentCell");
	g._editorCustom=g._editorCurrent=null;
	var equalsPrompt=false;
	if(oEditor!=null)
	{
		oEditor.setVisible(false);
		oEditor.removeEventListener("blur",igtbl_hideEdit);
		oEditor.removeEventListener("keydown",igtbl_hideEdit);
	}
	else
	{
		elem.style.display="none";
		if(type==0||type==1)
		{
			if(elem.style.position!="absolute")
			{
				var p=elem.parentNode;
				p.removeChild(elem);
				var i,nn=p.childNodes;
				if(nn!=null)for(i=0;i<nn.length;i++)
					if(nn[i].style!=null)nn[i].style.display="";
				i=((nn=g._oldElems)==null)?0:nn.length;
				while(i-->0)cell.appendChild(nn[i]);
				cell.style.width=cell.style.height="";
			}
		}
		else if(type==3)
		{
			
			if(!(cellObj.Column.AllowNull && cellObj.Column.ValueListPrompt==cellObj.Column.getNullText() && cellObj.Column.ValueListPrompt==elem.options[elem.selectedIndex].value ||
					elem.options[elem.selectedIndex].value!=cellObj.Column.ValueListPrompt))
				equalsPrompt=true;
		}
	}
	g._oldElems=null;
	g._exitEditCancel=false;
	if(key!=27 && cellObj._oldValue!==v && !equalsPrompt)
		cellObj.setValue(v);
	igtbl_fireEvent(gn,g.Events.AfterExitEditMode,"(\""+gn+"\",\""+cell.id+"\");");
	if(g.NeedPostBack)
	{
		igtbl_doPostBack(gn);
		return true;
	}
	if(key==9||key==13)
		igtbl_processTab(gn,evt,key,cellObj);
	return true;
}

function igtbl_processTab(gn,evt,key,cellObj)
{
	var g=igtbl_getGridById(gn);
	var start=null;
	if(typeof igtbl_ActivateNextCell=="function")
	{
		var oldAc=g.oActiveCell;
		if(key==9 && evt.shiftKey)
			start=igtbl_ActivatePrevCell(gn);
		else
			start=igtbl_ActivateNextCell(gn);
		if(!start && cellObj.Row.Band.getCellClickAction()==2)
		{
			start=cellObj.getNextTabCell(evt.shiftKey);
		}
		else if(!start)
		{
			
			//igtbl_blurTimeout(gn);
			if(oldAc && oldAc.Row.IsAddNewRow)
			{
			    
			    oldAc.Row.commit();
			    
				var nac=oldAc.Row.getCell(0);
				while(nac && !nac.Column.getVisible())
					nac=oldAc.Row.getCell(nac.Column.Index+1);
				if(nac)
				{
					nac.activate();
					nac.scrollToView();
				}
			}
			else
			{
			    
		        if(oldAc.Row.processUpdateRow)
                    oldAc.Row.processUpdateRow()
		        
				if(key==9 && evt.shiftKey)
					start=igtbl_ActivatePrevCell(gn);
				else
					start=igtbl_ActivateNextCell(gn);
			}
		}
		else if(oldAc && oldAc.Row!=g.oActiveCell.Row && oldAc.Row.IsAddNewRow && (oldAc.Row.Band.Index>0 && oldAc.Row.Band.AddNewRowView==2 || oldAc.Row.Band.AddNewRowView==1))
		{
			var nac=oldAc.Row.getCell(0);
			while(nac && !nac.Column.getVisible())
				nac=oldAc.Row.getCell(nac.Column.Index+1);
			if(nac)
			{
				nac.activate();
				nac.scrollToView();
			}
		}
		if(!start)
			delete g._lastKey;
		if(evt!=null)
			ig_cancelEvent(evt);
	}
	if(start && key==9 && igtbl_getCellClickAction(gn,cellObj.Column.Band.Index)==2)
	{
		
		if(g.oActiveRow!=start.Row)
		{
			start.Row.activate();
			if(start.Row.Band.getSelectTypeRow()==2)
				start.Row.setSelected(true);
		}
		start.beginEdit()
	}
	else if(start && key==9 && igtbl_getCellClickAction(gn,cellObj.Column.Band.Index)==1)
		try
		{
			window.setTimeout("try{igtbl_EnterEditMode('"+gn+"');}catch(ex){;}",100);
		}
		catch(ex)
		{
			igtbl_EnterEditMode(gn);
		}
	else
		igtbl_activate(gn);
}


function igtbl_getOffsetX(evnt,e)
{
	if(ig_csom.IsIE)
		return evnt.offsetX;
	else
		return evnt.clientX-igtbl_getLeftPos(e);
}
function igtbl_getOffsetY(evnt,e)
{
	if(ig_csom.IsIE)
		return evnt.offsetY;
	else
		return evnt.clientY-igtbl_getTopPos(e);
}
function igtbl_onResize(gn)
{
	if(typeof(igtbl_getGridById)=="undefined" || !ig_csom.IsIE55Plus)return;
	var gs=igtbl_getGridById(gn);
	if(!gs || !gs.isLoaded())return;
	var div=gs.Element.parentNode;
	if(!div || div.nodeName=="#document-fragment") return;
	var adjHeight=0;
	if(gs._scrElem)
	{
		div=gs._scrElem;
		if(gs.MainGrid&&!gs.MainGrid.style.height)
			adjHeight=div.scrollHeight-div.clientHeight;
	}
	var oldX=div.getAttribute("oldXSize");
	var oldY=div.getAttribute("oldYSize");
	var oldTop=div.getAttribute("oldTop");
	var oldLeft=div.getAttribute("oldLeft");
	var elTop=igtbl_getTopPos(gs.Element);
	var elLeft=igtbl_getLeftPos(gs.Element);
	if(oldX==null)
	{
		div.setAttribute("oldXSize",div.offsetWidth);
		div.setAttribute("oldYSize",div.offsetHeight);
		div.setAttribute("oldTop",elTop);
		div.setAttribute("oldLeft",elLeft);
		
		
		gs.alignStatMargins();
		
		gs.alignDivs(0,true);
		
		if(gs.StatHeader && (gs.UseFixedHeaders
		|| gs.XmlLoadOnDemandType!=0
		&& gs.XmlLoadOnDemandType!=4
		))
			gs.StatHeader.ScrollTo(div.scrollLeft);
		return;
	}
	if(oldX==div.offsetWidth && oldY==div.offsetHeight+adjHeight && oldTop==elTop && oldLeft==elLeft)
		return;
	div.setAttribute("oldXSize",div.offsetWidth);
	div.setAttribute("oldYSize",div.offsetHeight);
	div.setAttribute("oldTop",elTop);
	div.setAttribute("oldLeft",elLeft);
	if(gs.Element.getAttribute("noOnResize"))return;
	igtbl_hideEdit(gn);
	gs.alignStatMargins();
	gs.alignDivs(0,true);
	
	
	if(gs.StatHeader && (gs.UseFixedHeaders
	|| gs.XmlLoadOnDemandType!=0
	&& gs.XmlLoadOnDemandType!=4
	))
		gs.StatHeader.ScrollTo(div.scrollLeft);
	gs.endEditTemplate();
}
function igtbl_isDisabled(elem)
{
	if(ig_csom.IsIE55Plus)
		return elem.disabled;
	return elem.getAttribute("disabled") && elem.getAttribute("disabled").toString()=="true";
}
function igtbl_setDisabled(elem,b)
{
	if(ig_csom.IsIE55Plus)
		elem.disabled=b;
	else
	{
		elem.setAttribute("disabled",b);
		if(b)
		{
			if(typeof(elem.getAttribute("oldColor"))!="string")
				elem.setAttribute("oldColor",elem.style.color);
			elem.style.color="graytext";
		}
		else
		{
			if(typeof(elem.getAttribute("oldColor"))=="string")
			{
				elem.style.color=elem.getAttribute("oldColor");
				elem.removeAttribute("oldColor");
			}
			else
				elem.style.color="";
		}
	}
}

function igtbl_button(gn,evnt)
{
	if(document.all)
	{
		if(evnt.button==1)return 0;
		else if(evnt.button==4)return 1;
		else if(evnt.button==2)return 2;
		return -1;
	}
	if(evnt.button==0 && gn)
	{
		if(evnt.detail!=0)return 0;
		var gs=igtbl_getGridById(gn);
		if(gs.Element.getAttribute("mouseDown"))return 0;
		else return -1;
	}
	else if(evnt.button==1)return 1;
	else if(evnt.button==2)return 2;
	return -1;
}

function igtbl_srcElement(evt)
{
	var e=evt.srcElement;
	if(!e)e=evt.target;
	while(e&&!e.tagName)e=e.parentNode;
	return e;
}

function igtbl_styleName(sn)
{
	var r=sn.toLowerCase();
	var sa=r.split("-");
	for(var i=1;i<sa.length;i++)
		sa[i]=sa[i].charAt(0).toUpperCase()+sa[i].substr(1);
	r=sa.join("");
	return r;
}

function igtbl_setClassName(e,cn)
{
	var i=e.className.indexOf(cn);
	if(i==-1)
		e.className+=(e.className.length==0?"":" ")+cn;
}

function igtbl_removeClassName(e,cn)
{
	var i=e.className.indexOf(cn);
	if(i>=0)
	{
		var leftPart="";
		var rightPart="";
		if(i>0)
		{
			leftPart=e.className.substr(0,i);
			if(leftPart.substr(leftPart.length-1)==" ")
				leftPart=leftPart.substr(0,leftPart.length-1);
		}
		if(i+cn.length<e.className.length)
			rightPart=e.className.substr(i+cn.length);
		e.className=leftPart+rightPart;
	}
}

function igtbl_changeStyle(gn,se,style)
{
	var appldStyle=se.getAttribute("newClass");
	if(!style)
	{
		if(appldStyle)
			igtbl_removeClassName(se,appldStyle);
		se.removeAttribute("newClass");
		return;
	}
	else
	{
		var styleToApply=style;
		if(styleToApply==appldStyle)
			return;
		if(appldStyle)
			igtbl_changeStyle(gn,se,null);
		igtbl_setClassName(se,styleToApply);
		se.setAttribute("newClass",styleToApply);
	}
}
function igtbl_initEvent(se){this.srcElement=this.target=se;}
function igtbl_adjustLeft(e){return document.all?igtbl_getLeftPos(e):0;}
function igtbl_adjustTop(e){return document.all?igtbl_getTopPos(e):0;}
function igtbl_clientWidth(e)
{
	var cw=e.clientWidth;
	if(!cw)
	{
		cw=e.offsetWidth;
		if(e.scrollWidth)if(e.scrollWidth>cw)cw-=13;
	}
	return (cw>0)?cw:0;
}
function igtbl_clientHeight(e)
{
	var ch=e.clientHeight;
	if(!ch)
	{
		ch=e.offsetHeight;
		if(e.scrollHeight)if(e.scrollHeight>ch)ch-=13;
	}
	return (ch>0)?ch:0;
}

function igtbl_getInnerText(elem)
{
	if(!elem)return "";
	
	if (elem.nodeName=="#text"){return elem.nodeValue;}		
	var txt="",nn=elem.childNodes;
	if(ig_csom.IsIEWin)try{return elem.innerText;}catch(ex){;}
	if(elem.nodeName=="#text")txt=elem.nodeValue;
	else if(elem.nodeName=="BR")txt="\r\n";
	else if(nn)for(var i=0;i<nn.length;i++)txt+=igtbl_getInnerText(nn[i]);
	var sp=String.fromCharCode(160);
	while(txt.indexOf(sp)>=0)txt=txt.replace(sp," ");
	return txt;
}

function igtbl_setInnerText(elem,txt)
{
	if(!elem)return;
	
	if (elem.nodeName=="#text")
	{
	     elem.nodeValue=txt;
	     return;
	}	
	txt=(txt&&txt!="")?txt.toString():" ";
	if(ig_csom.IsIEWin)try{elem.innerText=txt;return;}catch(ex){;}
	while(txt.indexOf("\r")>=0)txt=txt.replace("\r","");
	while(txt.indexOf(" ")>=0)txt=txt.replace(" ",String.fromCharCode(160));
	var te=null,ss=txt.split("\n"),nn=elem.childNodes;
	var j=-1,i=nn.length;
	while(i-->0)
	{
		if(!te&&nn[i]&&nn[i].nodeName=="#text"){te=nn[i];te.nodeValue=te.data=ss[++j];}
		if(nn[i]!=te)elem.removeChild(nn[i]);
	}
	while(++j<ss.length)
	{
		if(j>0)elem.appendChild(document.createElement("BR"));
		try{elem.appendChild(document.createTextNode(ss[j]));}catch(ex){;}
	}
}

function igtbl_showColButton(gn,se,active)
{
	var gs=igtbl_getGridById(gn);
	if(!gs||se==null)return;
	var b=igtbl_initButton(gs),cell=gs.oActiveCell;
	if(!b)return;
	if(se=="hide")
	{
		gs._mouseWait=0;
		gs._mouseIn=null;
		if(active&&cell&&!cell.Row.GroupByRow&&cell.Column.ColumnType==7&&cell.Column.CellButtonDisplay==0)
		{
			if(b.getAttribute("srcElement")==cell.Element.id)return;
			try{window.setTimeout("try{igtbl_showColButton('"+gn+"','act');}catch(e){}",20);}catch(e){;}
		}
		if(b.style.display=="")b.style.display="none";
		return;
	}
	if(se=="act")
	{
		if(!cell||(cell.Row.ParentRow&&!cell.Row.ParentRow.getExpanded())||b.style.display=="")return;
		se=cell.Element;
	}
	igtbl_scrollToView(gn,se);
	
		
	var bandNo=null;
	var pNode=se;
	while(bandNo===null && (pNode=pNode.parentNode)!=null)
	{
		bandNo = pNode.getAttribute("bandNo");
	}
	var columnNo=igtbl_getColumnNo(gn,se);
	var column=gs.Bands[bandNo].Columns[columnNo];
    
	b.style.width=igtbl_clientWidth(se)+"px";
	b.style.height=igtbl_clientHeight(se)+"px";
	if(ig_shared.IsIE)
	{


		{
		
			var testValue = igtbl_getAbsBounds(se,gs);
			var divE=gs.getDivElement();
			b.style.left = (testValue.x-divE.scrollLeft)+"px";
			b.style.top = (testValue.y-divE.scrollTop) +"px";
		}
	}
	else
	{
	
	
		
		
		
		
		ig_csom.absPosition(se,b,ig_Location.MiddleCenter,null);
	}
	b.className=column.ButtonClass;
	if(se.innerHTML==igtbl_getNullText(gn,bandNo,columnNo))
		b.value=" ";
	else if(se.firstChild.tagName=="NOBR")
		b.value=igtbl_getInnerText(se.firstChild);
	else
		b.value=igtbl_getInnerText(se);
	b.setAttribute("srcElement",se.id);
	b.style.display="";
}

function igtbl_getDocumentElement(elemID)
{
	if(ig_shared.IsIE)
	{
		var obj;
		if(document.all)
			obj=document.all[elemID];
		else
			obj=document.getElementById(elemID);
		return obj;
	}
	else
	{
		var elem=document.getElementById(elemID);
		if(elem)
		{
			var elems=document.getElementsByTagName(elem.tagName);
			var els=[];
			for(var i=0;i<elems.length;i++)
			{
				if(elems[i].id==elemID)
					els[els.length]=elems[i];
			}
			return (els && els.length == 1) ? els[0] : els;
		}
		return null;
	}
}

function igtbl_onScroll(evnt, gn)
{
	var gs=igtbl_getGridById(gn);
	if(!gs) return;
	var de=gs.getDivElement();
	if(de.getAttribute("noOnScroll"))
	{
		if(de.getAttribute("oldSL"))
			igtbl_scrollLeft(de,parseInt(de.getAttribute("oldSL")));
		if(de.getAttribute("oldST"))
			igtbl_scrollTop(de,parseInt(de.getAttribute("oldST")));
		return igtbl_cancelEvent(evnt);
	}
	if (!igtbl_hideEdit(gn) && gs._exitEditCancel)
	{
		
		var activeCell = gs.getActiveCell();	
		if (activeCell)
		{
			gs._returnToEditModeFromScroll = true;
			igtbl_editCell(evnt, gn, activeCell.Element);
			gs._returnToEditModeFromScroll = null;
			return;
		}
	}
	igtbl_showColButton(gn,"hide");
	gs.alignStatMargins();
	gs.endEditTemplate();
	var isVertScroll=(typeof(gs._oldScrollTop)!="undefined" && gs._oldScrollTop!=de.scrollTop || typeof(gs._oldScrollTop)=="undefined" && de.scrollTop>0);
	
	if( (gs.Node || ig_csom.IsNetscape6 && gs.LoadOnDemand==3)&& !gs.AllowPaging && (gs.RowsServerLength>gs.Rows.length
		&& gs.XmlLoadOnDemandType!=2 || gs.XmlLoadOnDemandType==2 && isVertScroll
	))
		igtbl_onScrollXml(evnt,gn);
	if(gs.UseFixedHeaders)
	{
		if(typeof(gs.fhOldScrollLeft)=="undefined" && typeof(gs.fhOldScrollTop)=="undefined" || gs.fhOldScrollLeft!=gs._scrElem.scrollLeft || gs.fhOldScrollTop!=gs._scrElem.scrollTop)
		{

			gs.fhOldScrollLeft=gs._scrElem.scrollLeft;
			gs.fhOldScrollTop=gs._scrElem.scrollTop;

			if(gs.FixedColumnScrollType==2)
			{
				if(gs.alignDivsTimeoutID)
					window.clearTimeout(gs.alignDivsTimeoutID);
				gs.alignDivsTimeoutID=window.setTimeout("igtbl_doAlignDivs('"+gn+"')",250);
			}
			else
				gs.alignDivs();
		}
	}
	else if(gs.XmlLoadOnDemandType==1 || gs.XmlLoadOnDemandType>2 || !isVertScroll)
	{
		gs.alignDivs();
	}
	gs._oldScrollLeft=de.scrollLeft;
	gs._oldScrollTop=de.scrollTop;
	gs._removeChange("ScrollLeft",gs);
	gs._recordChange("ScrollLeft",gs,de.scrollLeft);
	gs._removeChange("ScrollTop",gs);
	gs._recordChange("ScrollTop",gs,de.scrollTop);
}


function igtbl_doAlignDivs(gn,force)
{
	var gs=igtbl_getGridById(gn);
	gs.alignDivsTimeoutID=null;
	gs.alignDivs(0,force);
}


function igtbl_filterMouseUp(evt)
{
	var src = ig_csom.IsIE ? evt.srcElement : evt.target;
	while(src && !src.getAttribute("filter"))
	{
		src = src.parentNode;
	}
	var filterDropObject = src.object;
	if (filterDropObject)
		filterDropObject.show(false);
	return ig_cancelEvent(evt);
}

function igtbl_filterMouseOver(evt)
{
	
	var src = ig_csom.IsIE?evt.srcElement:evt.target;
	
	while(src && src.tagName!="TR")
	{
		
		
        
        		
		if(src.tagName=="DIV" && (src.getAttribute("filter")
            || src.getAttribute("filterIconList")
		))
			return;
		src=src.parentNode;
	}
	
	if(src)
	{
		var srcDiv = src;
		
		while(srcDiv && !(srcDiv.getAttribute("filter")
            || srcDiv.getAttribute("filterIconList")
		))
		{
			srcDiv = srcDiv.parentNode;
		}
		if(srcDiv)
		{
			
			var filterDropObject = srcDiv.object;
			if (filterDropObject)
			{
				
			    if (src.tagName=="TR")
			        src=src.childNodes[0];
			    
			    src.setAttribute("oldStyle",src.className);
			    
				src.className =  filterDropObject.getHighlightStyle()+ " " + src.className;
			}	
		}
	}
}

function igtbl_filterMouseOut(evt)
{
	var src = ig_csom.IsIE ? evt.srcElement : evt.target;
	
	while(src && src.tagName!="TD")
	{
		src = src.parentNode;
	}
	if(src)
	{
	    var oldStyle = src.getAttribute("oldStyle");
		src.className = oldStyle?oldStyle:"";
	}
}

function igtbl_filterMouseUpDocument(evt)
{
	for(var gridId in igtbl_gridState)
	{
		var g = igtbl_getGridById(gridId);
		if (g._currentFilterDropped)
			g._currentFilterDropped.show(false);
	}
}

var igtbl_filterRequester;
function igtbl_stringEditorKeyPress(evt)
{
    if (igtbl_filterRequester)
    {
        window.clearTimeout(igtbl_filterRequester);
        igtbl_filterRequester=null;
    }
    
    
    var src=evt.srcElement?evt.srcElement:evt.target;
    if (src)
    {
		var cell= igtbl_getCellById(src.getAttribute("currentCell")); 
		if(cell.Column.AllowRowFiltering==3 && cell.Column.Band.Grid.LoadOnDemand!=3)
		{
			return;
		}
		if (cell.Column.DataType==8)
			igtbl_filterRequester=window.setTimeout("igtbl_filterRequest(\""+evt.srcElement.getAttribute("currentCell")+"\",\""+ evt.srcElement.value + "\",\"" + evt.srcElement.id + "\")",1000);
    }
}
function igtbl_filterRequest(cellId,editorValue,srcId)
{
    igtbl_filterRequester=null;
    var oCell = igtbl_getCellById(cellId);
    if (oCell.Row.IsFilterRow)
    {
        
        var columnFilter = oCell.Column._getFilterPanel(oCell.Row.Element);
        var filterOp=parseInt(oCell._getFilterTypeImage().getAttribute("operator"));
        
        if(editorValue!=null && editorValue!="" && oCell.Column.DataType==8)
        {   
            var re = new RegExp("^\\s+");
            editorValue = editorValue.replace(re,"");
        }
        
        if (editorValue==null || editorValue=="") filterOp=igtbl_filterComparisionOperator.All;
        
        var g=oCell.Row.Band.Grid;
        var curEditor=g._editorCurrent;
        if(curEditor)
        {
        	curEditor.setAttribute("noOnBlur",true);
            window.setTimeout("igtbl_clearNoOnBlurElem('"+curEditor.id+"')",100);
        }        
        
        columnFilter.setFilter(filterOp,editorValue);
        columnFilter.applyFilter();
        
        
        window.setTimeout("_realignFilterRowEditor(\""+g.UniqueID+"\",\""+ oCell.Id + "\")",250);
        
    }
}
function _realignFilterRowEditor(gn,cellId)
{
    var g = igtbl_getGridById(gn);
    var oCell = igtbl_getCellById(cellId);
    var curEditor=g._editorCurrent;
    if (curEditor&&curEditor.getAttribute("currentCell")==oCell.Id)
    {
        var cell=oCell.getElement();
	    var r=_igtbl_determineEditorPosition(g,g.UniqueID,oCell,cell,cell);
	    curEditor.style.left=r.x+"px";
	    curEditor.style.top=r.y+"px";
		
	}
}
