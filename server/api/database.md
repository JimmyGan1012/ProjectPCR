Database: 
    Name: PCR_Project
    Tables:{
        Usernames:{
            id: <int> <ic>,
            username: <char 255>
        },
        Arrangements:{ //16elements in total
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
            year: <int> 2000-2099
            highestDamage: <int>
            lowestDamage: <int>
            played: <boolean> //whether this arrangement is played
            playedDamage: default:null, comes meaningfull if played is true
        },
        CurrentInfo:{
            month:<int> 1-12,
            year:<int> 2000-2099,
            bossHP_1: <int>,
            bossHP_2: <int>,
            bossHP_3: <int>,
            bossHP_4: <int>,
            bossHP_5: <int>,
        },
        UserBox:{
            id
            username
            box_JSON
        }
    }