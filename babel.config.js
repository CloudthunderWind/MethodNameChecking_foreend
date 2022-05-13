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
                "markup",
                "markdown"
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
