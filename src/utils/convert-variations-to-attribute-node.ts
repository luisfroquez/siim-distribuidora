import type { Attributes, Variations } from '@/wp/types'

// export function convertVariationsToAttributeNode(
//   variations: Variations
// ): Attributes {
//   const attributes: Attributes = { nodes: [] }

//   variations.nodes.forEach((variationNode) => {
//     variationNode.attributes.nodes.forEach((attributeNode) => {
//       const existingAttribute = attributes.nodes.find(
//         (attr) => attr.name === attributeNode.label
//       )

//       if (existingAttribute) {
//         existingAttribute.options.push({
//           label: attributeNode.value,
//           value: attributeNode.attributeId,
//         })
//       } else {
//         attributes.nodes.push({
//           name: attributeNode.label,
//           options: [
//             { label: attributeNode.value, value: attributeNode.attributeId },
//           ],
//         })
//       }
//     })
//   })

//   return attributes
// }

export function convertVariationsToAttributeNode(
  variations: Variations
): Attributes {
  const attributes: Attributes = { nodes: [] }
  const uniqueOptions = new Set<string>()

  variations.nodes.forEach((variationNode) => {
    variationNode.attributes.nodes.forEach((attributeNode) => {
      const attributeName = attributeNode.label
      const optionLabel = attributeNode.value
      const optionValue = attributeNode.attributeId.toString()
      const existingAttribute = attributes.nodes.find(
        (attr) => attr.name === attributeName
      )

      if (existingAttribute) {
        if (!uniqueOptions.has(optionLabel)) {
          existingAttribute.options.push({
            label: optionLabel,
            value: optionValue,
          })
          uniqueOptions.add(optionLabel)
        }
      } else {
        attributes.nodes.push({
          name: attributeName,
          options: [{ label: optionLabel, value: optionValue }],
        })
        uniqueOptions.add(optionLabel)
      }
    })
  })

  return attributes
}
