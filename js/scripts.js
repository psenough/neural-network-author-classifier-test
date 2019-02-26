
let trainedNet;

function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 256));
}

function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}

function train(data) {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(data));
    trainedNet = net.toFunction();
};

function execute(input) {
    let results = trainedNet(encode(input));
    console.log(results)
    let output;
    let certainty;
    if (results.coppard > results.lovecraft) {
        output = 'Coppard'
        certainty = Math.floor(results.lovecraft * 100)
    } else { 
        output = 'Lovecraft'
        certainty = Math.floor(results.coppard * 100)
    }

    return "I'm " + certainty + "% sure that tweet was written by " + output;
}

train(trainingData);
console.log(execute("claws and teeth sharpened on centuries of dead corpses "));
