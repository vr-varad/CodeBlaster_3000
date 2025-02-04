import { execShellCommand } from "./execCommand.js";

const codeRunner = async (language, code) => {
    let imageName;
    let command;

    switch (language) {
        case 'python':
            imageName = 'python:3.9';
            command = `bash -c "echo '${Buffer.from(code).toString('base64')}' | base64 -d > program.py && python3 program.py"`;

            break;
        default:
            throw new Error('Unsupported language');
    }

    const containerCommand = `docker run --rm --cpus=1 --pids-limit=100 ${imageName} sh -c 'timeout 10s ${command}'`;

    return await execShellCommand(containerCommand);
};

export {
    codeRunner
}