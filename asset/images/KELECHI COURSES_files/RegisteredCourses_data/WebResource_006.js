 /*
  * Infragistics WebGrid CSOM Script: ig_WebGrid_kb.js
  * Version 7.1.20071.40
  * Copyright(c) 2001-2006 Infragistics, Inc. All Rights Reserved.
  */
 
// ig_WebGrid_kb.js
// Infragistics UltraWebGrid Script 
// Copyright (c) 2001-2007 Infragistics, Inc. All Rights Reserved.
function igtbl_onKeyDown(evnt,gn,my)
{
	var gs=igtbl_getGridById(gn);
	if(!evnt)evnt=window.event;
	if(!gs||!evnt||!gs.isLoaded())
		return;
	gs.event=evnt;
	var processed=false;
	var canceled=false;
	if(!gs.Activation.AllowActivation)
		return;
	var se=igtbl_srcElement(evnt);
	if(gs._focus==null&&se&&!igtbl_contains(gs.Element.parentNode.parentNode,se))
		return;
	if(gs._focus===false||igtbl_inEditMode(gn))return;
	var te=gs.Element;
	var cell=gs.getActiveCell();
	var row=gs.getActiveRow();
	if(!my&&se&&se.tagName&&se.tagName.length>4&&(!cell||cell.Column.ColumnType!=7))
		return;
	var elId,nextCell=null,nextRow=null,key=evnt.keyCode;
	if(cell)
		elId=cell.Element.id;
	else if(row)
		elId=row.Element.id;
	else 
		return;
	if(igtbl_fireEvent(gn,gs.Events.KeyDown,"(\""+gn+"\",\""+elId+"\","+key+")")==true)
		return;
	switch(key)
	{
		case 9: 
			if(cell)
			{
				if(evnt.ctrlKey)
					nextRow=cell.Row;
				else
					nextCell=cell.getNextTabCell(evnt.shiftKey,true
                            ,true
					);
			}
			else
			{
				if(evnt.ctrlKey)
					nextCell=row.getCell(0);
				else
					nextRow=row.getNextTabRow(evnt.shiftKey,false,true);
			}
			if(evnt.shiftKey)
			{
				if(nextCell)
				{
					te.setAttribute("startPointCell",nextCell.Element.id);
					te.setAttribute("selectMethod","cell");
					te.setAttribute("selectTable",nextCell.Row.Element.parentNode.parentNode.id);
					te.setAttribute("startPointRow",nextCell.Row.Element.id);
				}
				else if(nextRow)
				{
					te.setAttribute("selectMethod","row");
					te.setAttribute("selectTable",nextRow.Element.parentNode.parentNode.id);
					te.setAttribute("startPointRow",nextRow.Element.id);
				}
			}
			if(row && (row.IsAddNewRow && (!nextCell || nextCell.Row!=row)))
			{
				if(row.commit())
				{
					var nac=null;
					if(cell)
					{
						nac=row.getCell(0);
						while(nac && !nac.Column.getVisible())
							nac=row.getCell(nac.Column.Index+1);
						if(nac)
							nextCell=nac;
					}
					if(!nac)
						nextRow=row;
					processed=true;
				}
				else if(row.OwnerCollection.length>0)
				{
					if(row.Band.AddNewRowView==2 && evnt.shiftKey)
					{
						var nac=null;
						var nar=row.OwnerCollection.getRow(row.OwnerCollection.length-1);
						while(nar.Rows && nar.getExpanded())
						{
							if(nar.Rows.AddNewRow && nar.Band.AddNewRowView==2)
								nar=nar.Rows.AddNewRow;
							else
								nar=nar.Rows.getRow(nar.Rows.length-1);
						}
						if(cell && nar)
						{
							nac=nar.getCell(nar.cells.length-1);
							while(nac && !nac.Column.getVisible())
								nac=nar.getCell(nac.Column.Index-1);
							if(nac)
								nextCell=nac;
						}
						if(!nac)
							nextRow=nar;
						processed=true;
					}
					else if(row.Band.AddNewRowView==1 && !evnt.shiftKey)
					{
						var nac=null;
						var nar=row.OwnerCollection.getRow(0);
						if(cell)
						{
							nac=nar.getCell(0);
							while(nac && !nac.Column.getVisible())
								nac=nar.getCell(nac.Column.Index+1);
							if(nac)
								nextCell=nac;
						}
						if(!nac)
							nextRow=nar;
						processed=true;
					}
				}
			}
			if(nextCell || nextRow)
				processed=true;
			else
			{
				if(row)
				{
					if(row.processUpdateRow)
						row.processUpdateRow();
				}
			}
			break;
		case 13: 
			var b=igtbl_getElementById(gn+"_bt");
			if(b && b.style.display!="none")
			{
				processed=true;
				igtbl_colButtonClick(evnt,gn);
			}
			else if(cell)
			{
				processed=true;
				if(cell.Column.ColumnType==3)
				{
					if(cell.isEditable())
						cell.setValue(!cell.getValue());
				}
				else if(cell.Column.ColumnType==7)
				{
					if(cell.Column.CellButtonDisplay==0)
						b.fireEvent("onclick");
					else
					{
						var bi=cell.Element.childNodes[0];
						if(bi.tagName=="NOBR")
							bi=bi.childNodes[0];
						if(typeof(bi.fireEvent)!="undefined")
							bi.fireEvent("onclick");
					}
				}
				else if(cell.getTargetURL())
					igtbl_navigateUrl(cell.getTargetURL());
				else
					cell.beginEdit();
			}
			else if(row && row.GroupByRow)
			{
				processed=true;
				row.toggleRow();
			}
			break;
		case 16: 
			processed=true;
			if(cell)
			{
				if(!te.getAttribute("startPointCell"))
					te.setAttribute("startPointCell",cell.Element.id);
				te.setAttribute("selectMethod","cell");
				row=cell.Row;
				if(igtbl_getSelectTypeCell(gn,row.Band.Index)==3)
				{
					te.setAttribute("shiftSelect",true);
					te.setAttribute("startPointCell",cell.Element.id);
				}
			}
			else
			{
				te.setAttribute("selectMethod","row");
				if(igtbl_getSelectTypeRow(gn,row.Band.Index)==3)
				{
					te.setAttribute("shiftSelect",true);
					if(!te.getAttribute("startPointRow"))
						te.setAttribute("startPointRow",row.Element.id);
				}
			}
			te.setAttribute("selectTable",row.Element.parentNode.parentNode.id);
			break;
		case 32: 
			if(cell)
			{
				if(igtbl_getSelectTypeCell(gn,cell.Column.Band.Index)==3)
				{
					processed=true;
					cell.setSelected(!cell.getSelected());
				}
				else if(cell.Column.ColumnType==3)
				{
					processed=true;
					if(cell.isEditable())
					{
						var val=cell.getValue();
						if(val==="false") val=false;
						cell.setValue(!val);
					}
				}
			}
			else if(row)
			{
				processed=true;
				if(igtbl_getSelectTypeRow(gn,row.Band.Index)==3)
					row.setSelected(!row.getSelected());
			}
			break;
		case 35: 
			if(cell)
			{
				nextCell=cell.Row.getCell(cell.Row.cells.length-1);
				if(!nextCell.Column.getVisible())
					nextCell=nextCell.getPrevCell();
				if(nextCell==cell)
					nextCell=null;
			}
			else
			{
				nextRow=row.OwnerCollection.getRow(row.OwnerCollection.length-1);
				if(nextRow.getHidden())
					nextRow=nextRow.getPrevRow(true,true);
				if(nextRow==row)
					nextRow=null;
			}
			if(nextCell || nextRow)
				processed=true;
			break;
		case 36: 
			if(cell)
			{
				nextCell=cell.Row.getCell(0);
				while (nextCell && !nextCell.Element)
				{
				    
				    nextCell = nextCell.getNextCell();
				}
				if(nextCell && !nextCell.Column.getVisible())
				{
					nextCell=nextCell.getNextCell();
				}
				if(nextCell==cell)
				{
					nextCell=null;
				}
			}
			else
			{
				nextRow=row.OwnerCollection.getRow(0);
				if(nextRow.getHidden())
					nextRow=nextRow.getNextRow(true,true);
				if(nextRow==row)
					nextRow=null;
			}
			if(nextCell || nextRow)
				processed=true;
			break;
		case 37: 
			if(cell)
			{
				var possibleNextCell=cell;
				do
				{
					nextCell=possibleNextCell.getPrevCell();
					if(!nextCell)
					{
						var prevRow = possibleNextCell.Row.getPrevRow(true,true);
						if(prevRow)
						{
							nextCell=prevRow.getCell(prevRow.cells.length-1);
							if(!nextCell.Column.getVisible() || !nextCell.getElement())
								nextCell=nextCell.getPrevCell();
						}
					}
					possibleNextCell=nextCell;	
				}while(nextCell&&!nextCell.Element)			
				if(nextCell)
					processed=true;
				else
					gs.getDivElement().scrollLeft=0;
			}
			else if(row.Band.getExpandable()==1)
			{
				processed=true;
				row.setExpanded(false);
			}
			break;
		case 39: 
			if(cell)
			{
				var possibleNextCell=cell;
				do
				{	
					nextCell=possibleNextCell.getNextCell();							
					if(!nextCell)
					{	
						var nextRow = possibleNextCell.Row.getNextRow(true,true);		
						if(nextRow)
						{
							nextCell=nextRow.getCell(0);
							if(!nextCell.Column.getVisible() || !nextCell.getElement())
								nextCell=nextCell.getNextCell();
						}
					}	
					possibleNextCell=nextCell;	
				}while(nextCell&&!nextCell.getElement())
				if(nextCell)
					processed=true;
			}
			else if(row.Band.getExpandable()==1)
			{
				processed=true;
				row.setExpanded(true);
			}
			break;
		case 38: 
			if(cell && cell.Row.getPrevRow(true,true))
			{
				var nr=cell.Row.getPrevRow(true,true);
				while(!nextCell && nr)
				{
					nextCell=nr.getCellByColumn(cell.Column);
					nr=nr.getPrevRow(true,true);
                    
					if (nextCell && nextCell.Element==null)nextCell=null;
				}				
			}
			else if(row)
				nextRow=row.getPrevRow(true,true);
			if(nextCell || nextRow)
				processed=true;
			else if(row && row.Band.Index==0)
				gs.getDivElement().scrollTop=0;
			break;
		case 40: 
			if(cell && cell.Row.getNextRow(true,true))
			{
				var nr=cell.Row.getNextRow(true,true);
				while(!nextCell && nr)
				{
					nextCell=nr.getCellByColumn(cell.Column);
					nr=nr.getNextRow(true,true);
					
					if (nextCell && nextCell.Element==null)nextCell=null;
				}
			}
			else if(row)
				nextRow=row.getNextRow(true,true);
			if(!nextCell && !nextRow && gs.Node && gs.RowsRange>0 && gs.RowsServerLength>gs.Rows.length
				&& gs.XmlLoadOnDemandType!=2

			)
			
			if(gs.ReadyState==0)
				gs.invokeXmlHttpRequest(gs.eReqType.MoreRows);
			if(nextCell || nextRow)
				processed=true;
			break;
		default:
			if(evnt.ctrlKey && (key==67 || key==45 || key==88 || key==46 || key==86))
			{
				switch(key)
				{
					case 67: 
					case 45: 
						gs.copy();
						break;
					case 88: 
					case 46: 
						gs.cut();
						break;
					case 86: 
						gs.paste();
						break;
				}
				canceled=true;
			}
			else if(evnt.shiftKey && key==45)
			{
				gs.paste();
				canceled=true;
			}
			else
			if(key==46) 
			{
				processed=true;
				gs.deleteSelectedRows();
			}
			else if(key>=48 && key<=57 || key>=54 && key<=90 || key>=96 && key<=111 || key>=186 && key<=192 || key>=219 && key<=222 || key==113 || key==107 || key==109)
			{
				if((key==107 || key==109) && (!cell || !cell.isEditable())) 
				{
					if(cell && cell.Row.Band.getExpandable()==1)
					{
						processed=true;
						cell.Row.setExpanded(key==107);
					}
					else if(row && row.Band.getExpandable()==1)
					{
						processed=true;
						row.setExpanded(key==107);
					}
					break;
				}
				else if(cell)
				{
				    
					if(cell.isEditable() && cell.Column.ColumnType!=3 )
						cell.beginEdit(key);
					else if(cell.Column.getAllowUpdate()==3)
						cell.Row.editRow();
				}
				else if(row && key==113)
					row.editRow();
			}
			break;
	}
	if(
		!canceled &&
		(nextCell || nextRow))
	{
		if(nextCell)
		{
			var stc=nextCell.Row.Band.getSelectTypeCell();
			if((!evnt.shiftKey || key==9) && (!evnt.ctrlKey || stc!=3))
				igtbl_clearSelectionAll(gn);
			if(evnt.shiftKey && key!=9)
				igtbl_selectRegion(gn,nextCell.Element);
			else if(!evnt.ctrlKey && stc==3 || stc==2)
				nextCell.setSelected();
			nextCell.activate();
			nextCell.scrollToView();
			if(nextCell.Column.ColumnType==7 && nextCell.Column.CellButtonDisplay==0)
				igtbl_showColButton(gn,nextCell.Element);
			else if(key==9 && nextCell.Row.Band.getCellClickAction()==1)
				igtbl_EnterEditMode(gn);
		}
		else
		{
			var str=nextRow.Band.getSelectTypeRow();
			if((!evnt.shiftKey || key==9) && (!evnt.ctrlKey || str!=3))
				igtbl_clearSelectionAll(gn);
			igtbl_setActiveRow(gn,nextRow.getFirstRow());
			if(evnt.shiftKey && key!=9)
			{
			    
			    var firstElem = igtbl_getFirstCell(gn,nextRow.Element);
			    if(firstElem.previousSibling)firstElem=firstElem.previousSibling;
			    igtbl_selectRegion(gn,firstElem);
				
			}
			else if(!evnt.ctrlKey && str==3 || str==2)
				nextRow.setSelected();
			nextRow.scrollToView();
		}
		if(gs.NeedPostBack)
			igtbl_doPostBack(gn);
	}
	if(canceled)
		return ig_cancelEvent(evnt);
	else
	if(processed)
	{
		if(key!=16 && !evnt.shiftKey)
		{
			te.removeAttribute("selectMethod");
			te.removeAttribute("selectTable");
			te.removeAttribute("startPointRow");
			te.removeAttribute("startPointCell");
		}
		ig_cancelEvent(evnt);
	}
}

function igtbl_onKeyUp(evnt,gn)
{
	var gs=igtbl_getGridById(gn);
	if(!evnt)evnt=window.event;
	if(!gs||!evnt||!gs.Activation.AllowActivation)
		return;
	gs.event=evnt;
	var se=igtbl_srcElement(evnt);
	if(gs._focus==null&&!igtbl_contains(gs.Element.parentNode.parentNode,se))
		return;
	if(gs._focus===false||igtbl_inEditMode(gn))return;
	var te=gs.Element,cell=gs.oActiveCell;
	if(!cell)
		cell=gs.oActiveRow;
	if(cell)
		gs.fireEvent(gs.Events.KeyUp,[gs.Id,cell.Element.id,evnt.keyCode]);
}

function igtbl_rowFromRows(rows,n)
{
	if(n<0 || !rows)
		return null;
	var i=0,j=0;
	var row=rows[0];
	while(row && i<n)
	{
		if(i>=rows.length-1)
			return null;
		row=rows[++j];
		if(row && (row.getAttribute("hiddenRow") || row.parentNode.tagName=="TFOOT"))
			row=rows[++j];
		i++;
	}
	return row;
}

function igtbl_getFirstCell(gn,row)
{
	if(row.getAttribute("groupRow"))
		return row.childNodes[0].childNodes[0].childNodes[0].rows[0].cells[0];
	else
		return row.cells[igtbl_getBandFAC(gn,row)];
}

function igtbl_getParentRow(gn,row)
{
	var l=igtbl_getRowLevel(row.id);
	if(l.length==1)
	{
		delete l;
		return null;
	}
	var pl=igtbl_copyArray(l,l.length-1);
	var pr=igtbl_getRow(gn,pl);
	delete pl;
	delete l;
	return pr;
}

function igtbl_getCurRow(c)
{
	var r=null;
	while(c && !r)
		if(c.tagName=="TR" && !c.getAttribute("hiddenRow"))
			r=c;
		else
			c=c.parentNode;
	if(r && r.getAttribute("groupRow"))
		r=r.parentNode.parentNode.parentNode.parentNode;
	return r;
}

function igtbl_getFirstSibRow(gn,row)
{
	var rl=igtbl_getRowLevel(row.id);
	var rlns=igtbl_copyArray(rl);
	rlns[rlns.length-1]=0;
	var ns=igtbl_getRow(gn,rlns);
	while(ns && (ns.getAttribute("deleted") || ns.style.display=="none"))
	{
		rlns[rlns.length-1]++;
		ns=igtbl_getRow(gn,rlns);
	}
	delete rlns;
	delete rl;
	return ns;
}

function igtbl_getLastSibRow(gn,row)
{
	var lastRow=row;
	var ns=igtbl_getNextSibRow(gn,lastRow);
	while(ns)
	{
		lastRow=ns;
		ns=igtbl_getNextSibRow(gn,lastRow);
	}
	return lastRow;
}

function igtbl_getFirstChildRow(gn,row)
{
	var rl=igtbl_getRowLevel(row.id);
	var rlc=igtbl_copyArray(rl);
	rlc[rlc.length]=0;
	var ns=igtbl_getRow(gn,rlc);
	if(ns && (ns.getAttribute("deleted") || ns.style.display=="none"))
		ns=igtbl_getNextSibRow(gn,ns);
	delete rlc;
	delete rl;
	return ns;
}

function igtbl_getLastChildRow(gn,row)
{
	var ns=igtbl_getFirstChildRow(gn,row);
	if(ns)
	{
		var r=igtbl_getNextSibRow(gn,ns);
		while(r)
		{
			ns=r;
			r=igtbl_getNextSibRow(gn,ns);
		}
	}
	return ns;
}

function igtbl_ActivateNextCell(gn)
{
	var gs=igtbl_getGridById(gn);
	if(!gs || !gs.Activation.AllowActivation)
		return null;
	var cell=gs.oActiveCell;
	if(!cell)
		return null;
	var nextCell=cell.getNextTabCell(false,true);
	if(nextCell)
	{
		igtbl_setActiveCell(gn,nextCell.Element);
		if(gs.getActiveCell()==nextCell)
		{
			igtbl_clearSelectionAll(gn);
			igtbl_selectCell(gn,nextCell);
			nextCell.scrollToView();
			if(gs.NeedPostBack)
				igtbl_doPostBack(gn);
			return nextCell.Element;
		}
		else
			return cell.Element;
	}
	return null;
}

function igtbl_ActivatePrevCell(gn)
{
	var gs=igtbl_getGridById(gn);
	if(!gs || !gs.Activation.AllowActivation)
		return null;
	var cell=gs.oActiveCell;
	if(!cell)
		return null;
	var prevCell=cell.getNextTabCell(true,true);
	if(prevCell)
	{
		igtbl_setActiveCell(gn,prevCell.Element);
		if(gs.getActiveCell()==prevCell)
		{
			igtbl_clearSelectionAll(gn);
			igtbl_selectCell(gn,prevCell);
			prevCell.scrollToView();
			if(gs.NeedPostBack)
				igtbl_doPostBack(gn);
			return prevCell.Element;
		}
		else
			return cell.Element;
	}
	return null;
}

function igtbl_EnterEditMode(gn)
{
	var gs=igtbl_getGridById(gn);
	if(!gs || !gs.Activation.AllowActivation)
		return;
	var cell=gs.oActiveCell;
	if(!cell)
		return;
	cell.beginEdit();
	gs._exitEditCancel=false;
}

function igtbl_EndEditMode(gn)
{
	igtbl_hideEdit(gn);
}

function igtbl_getActiveCell(gn)
{
	var gs=igtbl_getGridById(gn);
	if(!gs || !gs.Activation.AllowActivation)
		return null;
	return gs.getActiveCell();
}

function igtbl_getActiveRow(gn)
{
	var gs=igtbl_getGridById(gn);
	if(!gs || !gs.Activation.AllowActivation)
		return null;
	return gs.getActiveRow();
}

function igtbl_getRowLevel(rowId)
{
	var rowObj=igtbl_getElementById(rowId);
	if(rowObj.getAttribute("level"))
		rowId=rowObj.getAttribute("level");
	var rn=rowId.split("_");
	var fn=rn.length-1;
	while(fn>=0)
	{
		if(!parseInt(rn[fn],10) && rn[fn]!="0")
			break;
		fn--;
	}
	fn++;
	var res=new Array();
	for(var i=fn;i<rn.length;i++)
		res[i-fn]=parseInt(rn[i],10);
	return res;
}

function igtbl_getNextSibRow(gn,row)
{
	var rl=igtbl_getRowLevel(row.id);
	var rlns=igtbl_copyArray(rl);
	rlns[rlns.length-1]++;
	var ns=igtbl_getRow(gn,rlns);
	while(ns && (ns.getAttribute("deleted") || ns.style.display=="none"))
	{
		rlns[rlns.length-1]++;
		ns=igtbl_getRow(gn,rlns);
	}
	delete rlns;
	delete rl;
	return ns;
}

function igtbl_getPrevSibRow(gn,row)
{
	var rl=igtbl_getRowLevel(row.id);
	var rlps=igtbl_copyArray(rl);
	rlps[rlps.length-1]--;
	var ps=igtbl_getRow(gn,rlps);
	while(ps && (ps.getAttribute("deleted") || ps.style.display=="none"))
	{
		rlps[rlps.length-1]--;
		ps=igtbl_getRow(gn,rlps);
	}
	delete rlps;
	delete rl;
	return ps;
}

function igtbl_copyArray(src,count)
{
	if(!count)
		count=src.length;
	var dest=new Array();
	for(var i=0;i<count;i++)
		dest[i]=src[i];
	return dest;
}

function igtbl_getRow(gn,l)
{
	if(!l.length || !l[0] && l[0]!=0)
		return null;
	var te=igtbl_getGridById(gn).Element;
	var clr=te.tBodies[0].rows;
	var row=igtbl_rowFromRows(clr,l[0]);
	if(row && row.parentNode.tagName=="TFOOT")
		return;
	for(var i=1;i<l.length;i++)
		if(!row || !l[i] && l[i]!=0)
			break;
		else
		{
			clr=igtbl_getChildRows(gn,row);
			row=igtbl_rowFromRows(clr,l[i]);
		}
	return row;
}
