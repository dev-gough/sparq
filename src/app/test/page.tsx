export default function TestPage() {
    return (
        <div className="h-screen bg-[url(/image001.png)] bg-repeat-y bg-cover">
            <iframe id='st_7fd29e5fdd334eb39f7e8851d2a79bce' frameBorder='0' scrolling='no' width='100%' height='100%' src='https://api.stockdio.com/visualization/financial/charts/v1/News?app-key=8ACD225816F0411C9D68403F9836E088&stockExchange=TSXV&symbol=SPRQ&includeImage=false&palette=Financial-Light&title=News&onload=st_7fd29e5fdd334eb39f7e8851d2a79bce'></iframe>
        </div>
    )
}