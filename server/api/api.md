API explanation:

    All api is located as /api/{{name}}, where name varies for different api

    "/login":
        method(get/post):post
        request:{
            username: <string> //username wanted to be logged in
        }
        resopnse:{
            login_successful: <boolean>
            username: <string> //the username successfully logged in 
        }
    
    "/adduser":
        method:post
        request:{
            username: <string> //the user wanted to be added
        }
        response:{
            adduser_successful: <boolean>
            username: <string> //the username in req
            member_fulled: <boolean>
            member_exiseted: <boolean>
        }

    "/getAllArrangements/:month/:year":
        method:get
        request:{
            month,
            year
        }
        response:{
            * in table arrangements, phrasing at local
        }

    "/postArrangement":
        method:post
        request:{
            id: key IC primiary
            username <string>
            round: <int>  range:>0
            bossID: <int> range:1-5
            slot1: <string> type: character.name
            slot2: ..
            slot3: ..
            slot4: ..
            slot5: ..
            day: <int> 1-7
            month: <int> 1-12
            year: <int> 00-99
            highestDamage: <int>
            lowestDamage: <int>
            expectedDamage:<int>
            played: <boolean> //whether this arrangement is played
            playedDamage: default:0, comes meaningfull if played is true
        },
        res{
            postSuccessful: <boolean>
        }

    "/setCurrentInfo":{
        method:post,
        request:{
            month:<int> 1-12,
            year:<int> 2000-2099,
            bossHP_1: <int>,
            bossHP_2: <int>,
            bossHP_3: <int>,
            bossHP_4: <int>,
            bossHP_5: <int>,
        },
        res:{
            overrideSuccessful:
        }

        "/editArrangement":{
            method:post,
            req:{
                {
                    id: key IC primiary
                    username <string>
                    round: <int>  range:>0
                    bossID: <int> range:1-5
                    slot1: <string> type: character.name
                    slot2: ..
                    slot3: ..
                    slot4: ..
                    slot5: ..
                    day: <int> 1-7
                    month: <int> 1-12
                    year: <int> 00-99
                    highestDamage: <int>
                    lowestDamage: <int>
                    expectedDamage:<int>
                    played: <boolean> //whether this arrangement is played
                    playedDamage: default:0, comes meaningfull if played is true
                }
            },
            res:{
                editArrangementSuccess: <boolean>
            }
        },

        "/deleteArrangement":{
            method:post,
            req:{
                {
                    id: key IC primiary
                    username <string>
                    round: <int>  range:>0
                    bossID: <int> range:1-5
                    slot1: <string> type: character.name
                    slot2: ..
                    slot3: ..
                    slot4: ..
                    slot5: ..
                    day: <int> 1-7
                    month: <int> 1-12
                    year: <int> 00-99
                    highestDamage: <int>
                    lowestDamage: <int>
                    expectedDamage:<int>
                    played: <boolean> //whether this arrangement is played
                    playedDamage: default:0, comes meaningfull if played is true
                }
            },
            res:{
                deleteArrangementSuccess: <boolean>
            }
        },

        "/postBox":{
            method:post,
            req:{
                id,
                username,
                box_JSON
            },
            res:{
                insertSuccess
            }
        },

        "/getAllBoxes":{
            method:get,
            res:{
                allBoxes:[..,..,..]
            }
        }
    }