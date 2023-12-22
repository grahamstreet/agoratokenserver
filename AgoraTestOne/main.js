const APP_ID = '158f5d347b48439fbef67fbb643b1385';
const APP_CERTIFICATE = '135d29ee580c48c8b020b49f13db8ef4';
const TOKEN = '007eJxTYLAqjv20Y3vm5i9q38tVHNfca/TN/aPb/8f5V5pJ3tydC7sVGAxNLdJMU4xNzJNMLEyMLdOSUtPMzNOSksxMjJMMjS1MF4nEpjYEMjLUqx5jZGSAQBCfhSE3MTOPgQEA4FQgzA==';


const CHANNEL = "main"

const client = AgoraRTC.createClient({mode: 'rtc', codec: 'vp8'})

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () =>  {
    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null)
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="video-player" id="user-${UID}"></div>

                  </div> `
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

let joinStream = async () => {
    await joinAndDisplayLocalStream()
    document.getElementById('join-btn').style.display = 'none'
    document.getElementById('stream-controls').style.display = 'flex'  
}

document.getElementById('join-btn').addEventListener('click', joinStream);




