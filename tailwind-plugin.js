const tailwind = require('tailwind-rn')

const convertClassNameIntoTailwindStyles = ({ types: t }) => {
    return {
        visitor: {
            JSXOpeningElement(path) {
                let foundAttribute = false
                let styles = {}

                path.get('attributes').forEach(attribute => {
                    if (!attribute.node.name) {
                        return
                    }

                    // First we need to find the attributes called className or tailwind
                    if (attribute.node.name.name === 'className' || attribute.node.name.name === 'tailwind') {
                        // We compile the style using tailwind-rn
                        const compiledStyle = tailwind(attribute.node.value.value)

                        // We then have to generate the definitions for the AST
                        styles = Object.keys(compiledStyle).map(cssProperty => {
                            const value = compiledStyle[cssProperty]

                            return t.ObjectProperty(
                                t.Identifier(cssProperty),
                                isNaN(value) ? t.StringLiteral(value) : t.NumericLiteral(value),
                            )
                        })

                        // We don't need the element anymore, so we remove it.
                        attribute.remove()

                        foundAttribute = true
                    }
                })

                if (foundAttribute) {
                    // Now we need to merge any existing styles with the classes we've just generated.
                    path.get('attributes').forEach(attribute => {
                        if (attribute.node.name.name === 'style') {
                            attribute.node.value.expression.properties.forEach(property => {
                                styles.push(property)
                            })

                            // Remove the old style attribute so it doesn't clash.
                            attribute.remove()
                        }
                    })

                    // We can now add our new style object with our compiled classes.
                    path.node.attributes.push(
                        t.JSXAttribute(t.JSXIdentifier('style'), t.JSXExpressionContainer(t.ObjectExpression(styles))),
                    )
                }
            },
        },
    }
}

module.exports = convertClassNameIntoTailwindStyles
