module.exports = {
    roots: ['./src/tests'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.(css|less)$': './styleMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': './fileMock.js',
    },

    setupFilesAfterEnv: ['./setupJest.ts'],
};
