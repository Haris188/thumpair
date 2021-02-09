import {GoogleSpreadsheet} from 'google-spreadsheet'
import creds from '../client_secret.json'

const loadSheet = async ()=>{
    const sheetId = process.env.REACT_APP_SHEET_ID
    const doc = new GoogleSpreadsheet(sheetId)
    await doc.useServiceAccountAuth(creds)
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[0]
    return sheet
}

export const addCompareClick = async ()=>{
    const sheet = await loadSheet()
    await sheet.loadCells('A1:B2')
    const b2 = sheet.getCell(1,1)
    b2.value = b2.value + 1
    await sheet.saveUpdatedCells()
}

export const addVisitCount = async ()=>{
    const sheet = await loadSheet()
    await sheet.loadCells('A1:B2')
    const a2 = sheet.getCell(1,0)
    a2.value = a2.value + 1
    await sheet.saveUpdatedCells()
}

export const addDemoClick = async ()=>{
    const sheet = await loadSheet()
    await sheet.loadCells('A1:C2')
    const a2 = sheet.getCell(1,2)
    a2.value = a2.value + 1
    await sheet.saveUpdatedCells()
}