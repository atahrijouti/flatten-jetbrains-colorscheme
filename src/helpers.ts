export type Option = {
  name: string
  value: string
  deuteranopia?: string
  protanopia?: string
}

export type Color = {
  $: Option
}

export type Attribute = {
  $: {
    name: string
  }
  value: [
    {
      option: Color[]
    },
  ]
}

export type Theme = {
  scheme: {
    colors: { option: Color[] }[]
    attributes: { option: Attribute[] }[]
  }
}

export const parseThemeJson = (xmlTheme: Theme) => {
  const dict: Record<string, string> = {}

  const attributes = xmlTheme.scheme.attributes[0].option
  attributes.forEach((attribute) => {
    const attributeName = attribute.$.name
    if (!attribute.value[0].option) {
      return
    }
    attribute.value[0].option.forEach((color) => {
      const option = color.$
      if (option.value) {
        dict[`${attributeName}.${option.name}`] = option.value
      }
      if (option.deuteranopia) {
        dict[`${attributeName}.${option.name}.deuteranopia`] = option.deuteranopia
      }
      if (option.protanopia) {
        dict[`${attributeName}.${option.name}.protanopia`] = option.protanopia
      }
    })
  })

  return dict
}
