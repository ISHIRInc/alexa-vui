export class Constants {
    public static SOCKET_URL="wss://ffvjesm8eg.execute-api.us-east-1.amazonaws.com/prod"
    public static MOCK_DATA=[
        ['Work',     11],
        ['Eat',      2],
        ['Commute',  2],
        ['watch tv', 2],
        ['sleep',    7]
    ]
}

export class VoiceMapper {
    public static ALEXA_COMMANDS={
        "OpenManipulation":{
            "view":"",
            "path":"skill-manipulation",
            "action":["work","eat","commute","watch tv","sleep"]
        },
        "OpenMinActivity":{
            "view":"",
            "path":"skill-manipulation",
            "action":["min"]
        },
        "OpenMaxActivity":{
            "view":"",
            "path":"skill-manipulation",
            "action":["max"]
        },
        "OpenAboutVUI":{
            "view":"",
            "path":"about-us",
            "action":[]
        }
    }
}
