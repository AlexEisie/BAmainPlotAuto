toast("脚本启动成功");
setScreenMetrics(1080, 2400);
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}
sleep(1e3);

var img = captureScreen();
let res = paddle.ocr(img);

toastLog("截图可用");
sleep(1e3);
// var textList = ['入場', 'MENU', 'TOUCH', '出擊','AUTO','確認'];
// var textSList = ['入场', 'MENU', 'TOUCH', '出击','AUTO','雅部'];
var textList = ['Enter', 'Menu', 'TOUCH', 'Mobilize','AUTO','Confirm'];
var textSList = ['Enter', 'Menu', 'TOUCH', 'MOBILIZE','AUTO','CONFIRM'];
var status=-1;
var loc=-1;
while(!cleared(res))
{
    img = captureScreen();
    res = paddle.ocr(img);
    log(JSON.stringify(res));
    loc=Judge(res);
    log(loc);
    log(status);
    switch (status)
    {
        case -1:
            break;
        case 0:
            if(hasNew(res))
            {
                click(res[loc].bounds.left,res[loc].bounds.top);
                sleep(1e3);
                click(1175,808);
                sleep(5e3);
            }
            break;
        case 1:
            press(res[loc].bounds.left+50,res[loc].bounds.top+50,100);
            sleep(2e3);
            click(2188,208);
            sleep(1e3);
            click(1404,822);
            break;
        case 2:
            click(1124,905);
            break;
        case 3:
            click(2200,900);
            sleep(60e3);
            break;
        case 4:
            sleep(10e3);
            break;
        case 5:
            click(res[loc].bounds.left,res[loc].bounds.top);
            sleep(10e3);
            break;
        default:
            break;
    }

    sleep(5e3);
}
toastLog("运行结束");

function Judge (res) 
{
    var j=0;
    log("已截图");
    var text;
    var textS;

    for (var k=0;k<6;k++)
    {
        j=0;
        text=textList[k];
        textS=textSList[k];
        while(res[j])
        {
            if(res[j].text.indexOf(text)!=-1||res[j].text.indexOf(textS)!=-1) 
            {
                status=k;
                return j;
            }
            else  j++;
        }
    }
    status=-1;
    return -1;
}

function hasNew(res)
{
    // toastLog(JSON.stringify(res));
    // exit();
    // var l=0;
    // while(res[l])
    // {
    //     if(res[l].text.indexOf("New")!=-1) return 1;
    //     else  l++;
    // }
    // if(!res[l])
    // {
    //     toastLog("没有新关卡");
    //     return 0;
    // }
    return 1;
}

function cleared(res)
{
    var l=0;
    while(res[l])
    {
        if(res[l].text.indexOf("cleared")!=-1) return 1;
        else  l++;
    }
    return 0;
}
