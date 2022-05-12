module.exports = {
    presets: [
        "@vue/cli-plugin-babel/preset"
    ],
    "plugins": [
        ["prismjs", {
            "languages": [
                "html",
                "css",
                "javascript",
                "java",
                "markup"
            ],
            "plugins": [
                "line-highlight",
                "line-numbers"
            ],
            "theme": "default",
            "css": true
        }]
    ]


};
