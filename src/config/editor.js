export const editorConfig = {
  config: {
    height: 500,
    menubar: true,
    codesample_languages: [
      { text: 'HTML/XML', value: 'markup' },
      { text: 'JavaScript', value: 'javascript' },
      { text: 'CSS', value: 'css' },
      { text: 'PHP', value: 'php' },
      { text: 'Ruby', value: 'ruby' },
      { text: 'Python', value: 'python' },
      { text: 'Java', value: 'java' },
      { text: 'C', value: 'c' },
      { text: 'C#', value: 'csharp' },
      { text: 'C++', value: 'cpp' },
      { text: 'JSON', value: 'json' },
      { text: 'Shell', value: 'shell' },
    ],
    plugins: [
      'advlist autolink lists link charmap print preview anchor',
      'searchreplace visualblocks code codesample fullscreen',
      'insertdatetime table paste help wordcount emoticons',
    ],
    toolbar:
      'undo redo | formatselect | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | code codesample | bullist numlist outdent indent' +
      'removeformat | emoticons | help',
    content_style: `body { font-family: 'Courier New', Courier, monospace !important; } * { font-size: 22px; }`,
  },
  apiKey: 'hodiak13k33m6krft9goq90iuhparv3ykt8blhc1z0fgqbdq',
};
