var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool(models.mysql);

// pool.getConnection(function(err,conn){
//     if(err) throw err;

//     conn.release();
// })

router.get('/test', (req, res) => {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        var sql = "SELECT * FROM Usernames";
        conn.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                res.json(result);
                console.log(result);
            }
        });
        conn.release();
    })
});

router.post('/login', (req, res) => {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        var username = req.body.username;
        var sql = 'SELECT count(*) from Usernames WHERE username=?'
        var login_successful = false;
        conn.query(sql, [username], function (err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {
                if (result[0]["count(*)"] == 1) {
                    login_successful = true
                    console.log("Login of user: " + username + " SUCCESSED")
                } else {
                    console.log("Login of user: " + username + " UNSCUCCESS")
                }
                res.json({
                    login_successful: login_successful,
                    username: username
                })
            }
        })
        conn.release();
    })

});

router.post('/adduser', (req, res) => {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        var username = req.body.newuser.name;
        var adduser_successful = false;
        var member_fulled = false;
        var member_exist = false;
        var sql = 'SELECT * from Usernames'
        conn.query(sql, function (err, result) {
            if (err) throw err;
            if (result) {
                if (result.length >= 30) {
                    member_fulled = true
                    adduser_successful = false
                }
                for (var usr of result) {
                    if (usr.username == username) {
                        member_exist = true
                        adduser_successful = false
                    }
                }

                if (member_exist || member_fulled) {
                    res.json({
                        adduser_successful: adduser_successful,
                        member_fulled: member_fulled,
                        member_exist: member_exist,
                        username: username
                    })
                } else {
                    var sql = 'INSERT INTO Usernames (username) VALUES (?)'
                    conn.query(sql, [username], function (err, result) {
                        if (err) throw err;
                        if (result) {
                            console.log(result);
                            adduser_successful = true;
                            console.log("User will be added")
                        } else {
                            console.log('User add error')
                            console.log({
                                adduser_successful: adduser_successful,
                                member_fulled: member_fulled,
                                member_exist: member_exist,
                                username: username
                            })
                        }
                        res.json({
                            adduser_successful: adduser_successful,
                            member_fulled: member_fulled,
                            member_exist: member_exist,
                            username: username
                        })
                    })
                }
            }
        })
        conn.release();
    })


});


router.get('/getAllArrangements', (req, res) => {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        var data = {
            arrangements: [],
            users: [],
            CurrentInfo: {
                month: {},
                year: {},
                bossHP_1: {},
                bossHP_2: {},
                bossHP_3: {},
                bossHP_4: {},
                bossHP_5: {},
            },
            getSuccessful: false,
            allBoxes:[]
        }
        var sql = 'SELECT * from CurrentInfo'
        conn.query(sql, function (err, result_1) {
            if (err) throw err;
            if (result_1) {
                data.CurrentInfo.month = result_1[0].month
                data.CurrentInfo.year = result_1[0].year
                data.CurrentInfo.bossHP_1 = result_1[0].bossHP_1
                data.CurrentInfo.bossHP_2 = result_1[0].bossHP_2
                data.CurrentInfo.bossHP_3 = result_1[0].bossHP_3
                data.CurrentInfo.bossHP_4 = result_1[0].bossHP_4
                data.CurrentInfo.bossHP_5 = result_1[0].bossHP_5
            } else {
                console.log("Problem encountered at getting current info result")
                data.getSuccessful = false
            }
            var sql = 'SELECT * from Arrangements WHERE month=? and year=?'
            conn.query(sql, [data.CurrentInfo.month, data.CurrentInfo.year], function (err, result_2) {
                if (err) throw err;
                if (result_2) {
                    data.arrangements = result_2
                } else {
                    console.log("Problem encountered at getting Arrangements")
                    data.getSuccessful = false
                }
                var sql = 'SELECT * from Usernames'
                conn.query(sql, function (err, result_3) {
                    if (err) throw err;
                    if (result_3) {
                        data.users = result_3
                    } else {
                        console.log("Problem encountered at getting Usernames")
                        data.getSuccessful = false
                    }
                    var sql = 'SELECT * from UserBox'
                    conn.query(sql,function (err, result_4) {
                        if (err) throw err
                        if(result_4){
                            data.allBoxes=result_4
                            data.getSuccessful = true
                        }else{
                            console.log("Problem encountered at getting allBoxes")
                            data.getSuccessful = false
                        }
                        res.json({ data: data })
                    })
                })
            })
        })
        conn.release();
    })

})

router.post("/postArrangement", (req, res) => {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        var data = req.body
        var sql = 'INSERT INTO Arrangements (id,username,round,bossID,slot1,slot2,slot3,slot4,slot5,day,month,year,highestDamage,lowestDamage,expectedDamage,played,playedDamage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
        conn.query(sql, [data.id,
        data.username,
        data.round,
        data.bossID,
        data.slot1,
        data.slot2,
        data.slot3,
        data.slot4,
        data.slot5,
        data.day,
        data.month,
        data.year,
        data.highestDamage,
        data.lowestDamage,
        data.expectedDamage,
        data.played,
        data.playedDamage], function (err, result) {
            if (err) throw err;
            if (result) {
                res.json({
                    postSuccessful: true
                });
                console.log(result);
            } else {
                res.json({
                    postSuccessful: false
                })
            }
        })
        conn.release();
    })

})

router.post("/postCurrentInfo", (req, res) => {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        var month = req.body.month
        var year = req.body.year
        var bossHP_1 = req.body.bossHP_1
        var bossHP_2 = req.body.bossHP_2
        var bossHP_3 = req.body.bossHP_3
        var bossHP_4 = req.body.bossHP_4
        var bossHP_5 = req.body.bossHP_5

        var overrideSuccessful = false
        var sql = "DELETE FROM CurrentInfo where Unique_ID=1"
        conn.query(sql, function (err, result) {
            if (err) {
                overrideSuccessful = false
                throw err
            }
            if (result) {
                console.log(result)
            } else {
                console.log("Problem encountered, result is:", result)
                overrideSuccessful = false
            }

            var sql = "INSERT INTO CurrentInfo (Unique_ID,month,year,bossHP_1,bossHP_2,bossHP_3,bossHP_4,bossHP_5) VALUES (1,?,?,?,?,?,?,?)"
            conn.query(sql, [month, year, bossHP_1, bossHP_2, bossHP_3, bossHP_4, bossHP_5], function (err, result) {
                if (err) {
                    overrideSuccessful = false
                    throw err
                }
                if (result) {
                    console.log(result)
                    overrideSuccessful = true
                } else {
                    console.log("Problem encountered, result is:", result)
                    overrideSuccessful = false
                }
                res.json({ overrideSuccessful: overrideSuccessful })
            })

        })
        conn.release();
    })




})

router.post("/editArrangement", (req, res) => {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        var arrangement = req.body
        var sql = 'DELETE from Arrangements WHERE id=?'
        var editArrangementSuccess = false;
        conn.query(sql, [arrangement.id], function (err, result_1) {
            if (err) throw err;
            if (result_1) {

            } else {
                console.log("Error in deleting element")
            }
            var sql = 'INSERT INTO Arrangements (id,username,round,bossID,slot1,slot2,slot3,slot4,slot5,day,month,year,highestDamage,lowestDamage,expectedDamage,played,playedDamage) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
            conn.query(sql, [arrangement.id,
            arrangement.username,
            arrangement.round,
            arrangement.bossID,
            arrangement.slot1.name,
            arrangement.slot2.name,
            arrangement.slot3.name,
            arrangement.slot4.name,
            arrangement.slot5.name,
            arrangement.day,
            arrangement.month,
            arrangement.year,
            arrangement.highestDamage,
            arrangement.lowestDamage,
            arrangement.expectedDamage,
            arrangement.played,
            arrangement.playedDamage], function (err, result_2) {
                if (err) throw err;
                if (result_2) {
                    editArrangementSuccess = true;
                } else {
                    console.log("Error in inserting element")
                }
                res.json({ "editArrangementSuccess": editArrangementSuccess })
            })
        })
        conn.release();
    })

})

router.post("/deleteArrangement", (req, res) => {
    pool.getConnection(function (err, conn) {
        if (err) throw err;
        var arrangement = req.body
        var sql = 'DELETE from Arrangements WHERE id=?'
        var deleteArrangementSuccess = false;
        conn.query(sql, [arrangement.id], function (err, result) {
            if (err) throw err;
            if (result) {
                deleteArrangementSuccess = true
            } else {
                console.log("Error in deleting arrangment id:", arrangement.id)
            }
            res.json({ "deleteArrangementSuccess": deleteArrangementSuccess })
        })
        conn.release();
    })
})

router.post("/postBox", (req, res) => {
    var username = req.body.username
    var box_JSON = req.body.box_JSON
    var insertSuccess = false
    pool.getConnection(function (err, conn){
        if (err) throw err;
        var sql = "DELETE FROM UserBox WHERE username=?"
        var deleteSuccess=false
        conn.query(sql, [username], function (err, result) {
            if (err) throw err
            if (result) {
                deleteSuccess=true
            }
            var sql = "INSERT into UserBox (username,box_JSON) VALUES (?,?)"
            conn.query(sql, [ username, box_JSON], function (err, result) {
                if (err) throw err
                if (result) {
                    if(deleteSuccess){
                        insertSuccess=true
                    }
                }
                // console.log("deleteSuccess",deleteSuccess,"\nnsertSuccess",insertSuccess)
                res.json({ "insertSuccess": insertSuccess })
            })
        }) 
        conn.release();
    })
})


module.exports = router;