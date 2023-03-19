import React from 'react'

function FormattedText({ text }: { text: string }) {
    let formattedText = "";
    if (text)
        formattedText = text.replace(/\n/g, '<br />');

    return (
        <div dangerouslySetInnerHTML={{ __html: formattedText }} />
    )
}

export default FormattedText