let puppeteer = require("puppeteer");
let fs = require("fs");
let credentialsFile = process.argv[2];
let comment = "Dominos is better :/";


(async function(){
    try{
    let data = await fs.promises.readFile(credentialsFile,"utf-8");
    let credentials = JSON.parse(data);

    let login = credentials.login;
    let email = credentials.email;
    let pwd = credentials.pwd;
    

    let browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        headless : false,
        defaultViewport: null,
        args:["--start-maximized", "--icognito","--disable-notifications"],
        slowMo: 100,
    });

    
    let numberOfPages = await browser.pages();
    let tab = numberOfPages[0];
    
    await tab.goto(login, {
        waitUntil:"networkidle2"
    });

    await tab.goto("https://accounts.google.com/signin/v2/identifier?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
    , {waituntil : "networkidle2"});
       
    await tab.waitForSelector("#identifierId") 
    await tab.type("#identifierId", email ,{delay:150})

    await tab.waitForSelector("#identifierNext")
    await tab.click("#identifierNext")

    await tab.waitForSelector("#password") 
    await tab.type("#password", pwd ,{delay:200})
    
    await tab.waitForSelector(".RveJvd.snByac")
    await tab.click(".RveJvd.snByac")
    
    await tab.waitForSelector(".style-scope.ytd-searchbox");
    let totalimages =  await tab.$$(".style-scope.ytd-searchbox");
        await totalimages[0].click();
        await tab.type(".style-scope.ytd-searchbox", "Pizzahut" ,{delay:150})
        await tab.keyboard.press('Enter'); 

        await delay(2000);
        await tab.goto("https://www.youtube.com/watch?v=sKsFt23oN1w", {
            waitUntil:"networkidle2"
        });

    await tab.waitForSelector(".style-scope.ytd-menu-renderer.force-icon-button.style-text");
    let like =  await tab.$$(".style-scope.ytd-menu-renderer.force-icon-button.style-text");
        await like[0].click();

    await tab.waitForSelector(".style-scope.ytd-subscribe-button-renderer");
    let subs =  await tab.$$(".style-scope.ytd-subscribe-button-renderer");
        await subs[0].click();

    await tab.waitForSelector("div[id='creation-box']")
    await tab.click("div[id='creation-box']")
    await tab.type("div[id='creation-box']", comment ,{delay:200})
        
function delay(time){
    return new Promise(function(resolve){
        setTimeout(resolve,time)
    });
}

    tab = await browser.newPage();

    await tab.goto("https://www.dominos.co.in/", {
        waitUntil:"networkidle2"
    })
    await tab.goto("https://pizzaonline.dominos.co.in/?src=brand", {
        waitUntil:"networkidle2"
    })

    await tab.waitForSelector(".non--slctd.container");
    let pick =  await tab.$$(".non--slctd.container");
        await pick[0].click();

        await tab.waitForSelector("input[placeholder='Select City']", {visible:true}) 
        await tab.type("input[placeholder='Select City']", "NEW DELHI" ,{delay:150})
        await tab.click("input[placeholder='Select City']")
        await tab.click(".lst-desc-main.ellipsis")

        await tab.click("input[placeholder='Select Store']")
        let place =  await tab.$$(".lst-desc-main.ellipsis");
        await place[0].click();

        await tab.waitForSelector(".btn--grn")
        await tab.click(".btn--grn")

        await tab.waitForSelector(".injectStyles-sc-1jy9bcf-0.jrxrSi")
        let cart =  await tab.$$(".injectStyles-sc-1jy9bcf-0.jrxrSi");
        await cart[0].click();

        await tab.waitForSelector(".btn--grn")
        await tab.click(".btn--grn")
        
        await tab.screenshot({path : 'final.png'});

    // await delay(2000);
    // browser.close();

}catch(err){
    console.log(err);
}

})();

async function navigationHelper(tab, selector) {
    await Promise.all([tab.waitForNavigation({
        waitUntil: "networkidle2"
    }), tab.click(selector)]);
}