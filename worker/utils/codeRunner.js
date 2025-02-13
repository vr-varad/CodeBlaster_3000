import { createUser, deleteUser, execShellCommand } from "./execCommand.js";
import crypto from 'crypto';

const codeRunner = async (language, code) => {
    let imageName;
    let command;

    const username = crypto.randomBytes(6).toString('hex');

    const userId = await createUser(username);

    // conversion required so that code doesn't contain any special characters 
    // that gets misinterpreted in the shel like " or ' or & etc.
    switch (language) {
        case 'python':
            imageName = 'python:3.9';
            command = `bash -c "echo '${Buffer.from(code).toString('base64')}' | base64 -d > program.py && python3 program.py"`;
            break;
        case "javascript":
            imageName = 'node:20';
            const base64Code = Buffer.from(code).toString("base64");
            command = `bash -c "echo '${base64Code}' | base64 -d > /tmp/program.js && node /tmp/program.js"`;
            break;
        default:
            throw new Error('Unsupported language');
    }

    const containerCommand = `docker run --rm -u ${userId} --read-only --tmpfs /tmp --cpus=1 --pids-limit=100 ${imageName} sh -c 'timeout 10s ${command}'`;


    try {
        const result = await execShellCommand(containerCommand);
        await deleteUser(username);
        return result;
    } catch (error) {
        await deleteUser(username);
        throw error;
    }
};

export {
    codeRunner
}