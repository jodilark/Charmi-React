exports.getMatchesByUserID = (req, res) => {
  req.app.get('db').getMatches(req.params.id).then(matches => {
    const uniqueIDs = []
    const all = []
    //get all unique user id'set
    matches.map((elem, i) => {
      uniqueIDs.includes(matches[i].user_1) ? null : uniqueIDs.push(matches[i].user_1);
      uniqueIDs.includes(matches[i].user_2) ? null : uniqueIDs.push(matches[i].user_2);
    })
    //get user profiles
    for (let i = 0; i < uniqueIDs.length; i++) {
      if (uniqueIDs[i] == req.params.id) {
        uniqueIDs.splice(i, 1)
      }
    }
    const allProfiles = []
    const allConversations = []
    let sendProfile = (arr) => {
      let b = arr.pop()
      req.app.get('db').getProfile(b).then(profile => {
        //getconvID's
        let myId = req.params.id / 1
        req.app.get('db').getUserConversations(myId, b).then(convID => {
          allProfiles.push(profile[0])
          allConversations.push(convID[0])
          if (arr.length > 0) sendProfile(arr)
          else {
            all.push(matches)
            all.push(allProfiles)
            all.push(allConversations)
            res.status(200).send(all)
          }
        })
      })
    }
    sendProfile(uniqueIDs)
  })
}
//Create a match
exports.createMatch = (req, res) => {
  //get all records from matches
  const myID = req.params.id / 1
  let u1 = req.body.user_1
  let u2 = req.body.user_2
  let theirID
  let counter = 0
  myID == u1 ? theirID = u2 : theirID = u1
  req.app.get('db').customMatchQuery(myID).then(allMatches => {
    console.log(`my id: ${myID}. user_1 id: ${u1}. user_2 id: ${u2}. their id: ${theirID}. allMatches.length: ${allMatches.length}`)
    if (allMatches.length !== 0) {
      for (let i = 0; i < allMatches.length; i++) {
        console.log(`inside for loop${allMatches[i].user_1}`)
        if (allMatches[i].user_1 === theirID || allMatches[i].user_2 === theirID) {
          counter++
          console.log(`why isn't it hitting here`)
          for (let i = 0; i < allMatches.length; i++) {
            if (allMatches[i].user_1 === theirID && allMatches[i].matched === true || allMatches[i].user_2 === theirID && allMatches[i].matched === true) {
              // Do Nothing
              return res.status(200).send(`Users are already matched`)
            }
            else if (allMatches[i].user_1 === theirID || allMatches[i].user_2 === theirID) {
              //PUT
              console.log(`got to else if ${allMatches[i].id}`)
              req.app.get('db').updateMatch(allMatches[i].id).then(newMatch => {
                console.log(`got promise`)
                req.app.get('db').createConversation(myID, theirID).then(conversationID => {
                  console.log(`response return of create conversation 1`)
                  const responseReturn = [allMatches[i].id, conversationID]
                  console.log(`response return of create conversation 2 ${JSON.stringify(responseReturn)}`)
                  return res.status(200).send(`Updated match and created conversation: ${responseReturn}`)
                })
                res.status(200).send(`Updated match record with the id of: ${allMatches[i].id}`)
              }).catch(err => res.status(500).send(err))
            }
          }
        }
        else {
          counter++
          if (counter === allMatches.length) {
            return res.status(200).send(`Profile was already liked`)
          }
        }
      }
      res.status(200)
    }
    else {
      // create a new record
      console.log(`These are the users ${myID, theirID}`)
      req.app.get('db').createMatches(myID, theirID).then(newMatchRecord => {
        res.status(200).send(`new match record was created successfully`)
      }).catch(err => res.status(500).send(err))
    }
  }).catch(err => res.status(500).send(err))
}




{id
:
22
user_1
:
54
user_2
:
5}

