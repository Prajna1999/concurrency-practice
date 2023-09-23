const {Worker, isMainThread, parentPort}=require('worker_threads');

const cpuIntensiveTask=(durationMs)=>{
    const end=Date.now()+durationMs;
    while(Date.now()<end){
        return 'Done with CPU work';
    }
}

if(isMainThread){
    // spawn a worker thread
    const worker=new Worker(__filename);
    worker.on('message', (msg)=>{
        console.log('Recieved from worker: ',msg);
    });

    let start=Date.now();
    let duration=Math.floor(Math.random()*1000)+500;

    worker.postMessage({
        duration:duration,start:start
    });
}else{
    parentPort.on('message', (data)=>{
        let result=cpuIntensiveTask(data.duration);
        let timeTaken=Date.now()-data.start;
        parentPort.postMessage(`${result} in ${timeTaken} ms!`);
    });
}