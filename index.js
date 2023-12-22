    const express = require('express');
    const {RtcTokenBuilder, RtcRole} = require('agora-access-token');

    const PORT=8080;

    //const APP_ID = process.env.APP_ID;
    //const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

    const APP_ID = '158f5d347b48439fbef67fbb643b1385';
    const APP_CERTIFICATE = '135d29ee580c48c8b020b49f13db8ef4';

    const app = express();

    const nocache = (req, resp, next) => {
        resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        resp.header('Expires', '-1');
        resp.header('Pragma', 'no-cache');
        next();
    }

    const generateAccessToken = (req, resp) => {

        // set response header
        resp.header('Access-Control-Allow-Origin', '*');

        // get channel name
        const channelName = req.query.channelName;
        if(!channelName) {
            return resp.status(500).json({ 'error': 'channel name is required' });
        }

        // get uid
        let uid = req.query.uid;
        if (!uid || uid == '') {
            uid = 0;
        }

        // get role
        let role = RtcRole.SUBSCRIBER;
        if (req.query.role == 'publisher'){
            role = RtcRole.PUBLISHER;
        }

        // get expiratiom time for the token
        let expireTime = req.query.expireTime;
        if (!expireTime || expireTime == '') {
            expireTime = 3600;
        } else {
             expireTime = parseInt(expireTime, 10);
        }

        // calculate privilege expiration time
        const currentTime = Math.floor(Date.now() / 1000);
        const privilegeExpireTime = currentTime + expireTime;
        
        // build the token
        const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);

        // return the token
        resp.json({ 'token': token });

    }

    app.get('/access_token', nocache, generateAccessToken);

    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });

