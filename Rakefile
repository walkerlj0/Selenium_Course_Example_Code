require 'redcarpet'
require 'redcarpet/render_strip'
require 'erb'
require 'pygments'
require 'docverter'
require 'zip'

@template = <<HERE
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <title>The Selenium Guidebook: How To Use Selenium, successfully</title>
    <style type="text/css">
      @font-face {
        font-family: 'Droid Sans';
        font-style: normal;
        font-weight: 400;
        src: url('droid_sans.ttf');
        -fs-pdf-font-embed: embed;
        -fs-pdf-font-encoding: Identity-H;
      }
      body {
        font-family: 'Droid Sans';
      }
      div.page_footer {
      }
      h1 {
        page-break-before: always;
      }
      pre {
        white-space: pre;
        white-space: pre-wrap;
        page-break-inside: avoid;
        orphans: 0;
        widows: 0;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        display: block;
        padding: 9.5px;
        margin: 0 0 10px;
        font-size: 13px;
        line-height: 20px;
      }
      code {
          padding: 2px 4px;
          background-color: #f7f7f9;
      }
      img {
        width: 600px;
      }
      <%= Pygments.css %>
    </style>
  </head>
  <body>
    <%= @content %>
  </body>
</html>
HERE

class HighlightedCopyWithChapterNumbering < Redcarpet::Render::HTML

  def header(text, header_level)
    if header_level == 1
      @counter ||= 0
      @counter += 1
      "<h1 id=\"chapter#{@counter}\"><small>Chapter #{@counter}</small><br>#{text}</h1>\n"
    else
      "<h#{header_level}>#{text}</h#{header_level}>\n"
    end
  end

  def block_code(code, language)
    Pygments.highlight(code, lexer: language, encoding: 'utf-8')
  end

  def postprocess(document)
    document.gsub('&#39;', "'")
  end

end

class CopyWithNoFrills < Redcarpet::Render::HTML

  def block_code(code, language)
    Pygments.highlight(code, :lexer => language)
  end

  def postprocess(document)
    document.gsub('&#39;', "'")
  end

end

class TOCwithChapterNumbering < Redcarpet::Render::StripDown
  attr_reader :chapters

  def header(text, header_level)
    return unless header_level == 1
    @chapters ||= []
    @chapters << text
    ""
  end

  def postprocess(document)
    items = []
    @chapters.each_with_index do |text, chapter_number|
      items << "<li><a href=\"#chapter#{chapter_number+1}\">#{text}</a></li>"
    end
    return <<HERE
<ol>
#{items.join("\n")}
</ol>
HERE
  end

end

@renderer_toc         = Redcarpet::Markdown.new(TOCwithChapterNumbering, fenced_code_blocks: true)
@renderer_content     = Redcarpet::Markdown.new(HighlightedCopyWithChapterNumbering, fenced_code_blocks: true)
@renderer_no_frills   = Redcarpet::Markdown.new(CopyWithNoFrills, fenced_code_blocks: true)

def vacuum
  tmp = ""
  tmp << yield
  tmp << "\n\n"
  tmp
end

def cover
  @renderer_no_frills.render( vacuum { File.read('content/cover.md') })
end

def acknowledgements
  @renderer_no_frills.render( vacuum { File.read('content/acknowledgements.md') })
end

def preface
  @renderer_no_frills.render( vacuum { File.read('content/preface.md') })
end

def toc
  '<h1>Table of Contents</h1>' + @renderer_toc.render(raw_content)
end

def raw_content
  content = ""
  number_of_chapters.times do |count|
    chapter_number = count + 1
    content << File.read("content/chapters/#{chapter_number}.md")
  end
  content
end

def number_of_chapters
  Dir.glob('content/chapters/*.md').count
end

def content
  @renderer_content.render(raw_content)
end

namespace :gen do
  desc 'Generate HTML'
  task :html do
    @content =  cover + preface + acknowledgements + toc + content
    html = ERB.new(@template).result(binding)
    `rm -rf output/html`
    `mkdir output/html`
    File.open('output/html/The Selenium Guidebook.html', 'w+') { |f| f.write html }
    `cp assets/* output/html`
  end

  desc 'Generate PDF'
  task :pdf do
    @content =  cover + preface + acknowledgements + toc + content
    html = ERB.new(@template).result(binding)

    File.open('output/The Selenium Guidebook.pdf', 'w+') do |f|
      f.write(Docverter::Conversion.run do |c|
        c.from    = 'html'
        c.to      = 'pdf'
        c.content = html
        Dir.glob('assets/*') do |asset|
          c.add_other_file asset
        end
      end)
    end
  end

#  desc 'Generate PDF Sample Chapter'
#  task :preview do
#    @content =  cover + toc + sample_content
#    html = ERB.new(@template).result(binding)
#
#    File.open('output/The Selenium Guidebook Sample.pdf', 'w+') do |f|
#      f.write(Docverter::Conversion.run do |c|
#        c.from    = 'html'
#        c.to      = 'pdf'
#        c.content = html
#        Dir.glob('assets/*') do |asset|
#          c.add_other_file asset
#        end
#      end)
#    end
#  end

  desc 'Generate MOBI'
  task :mobi do
    File.open('output/The Selenium Guidebook.mobi', 'w+') do |file|
      mobi = Docverter::Conversion.run do |c|
        c.from              = 'markdown'
        c.to                = 'mobi'
        c.content           = raw_content
        c.epub_metadata     = 'metadata.xml'
  #      c.epub_cover_image  = 'bookcover.png'
        c.epub_stylesheet   = 'epub.css'
        c.add_other_file    'assets/epub.css'
        c.add_other_file    'assets/metadata.xml'
  #      c.add_other_file    'assets/bookcover.png'
      end

      file.write mobi
    end
  end

  desc 'Generate EPUB'
  task :epub do
    File.open('output/The Selenium Guidebook.epub', 'w+') do |file|
      epub = Docverter::Conversion.run do |c|
        c.from              = 'markdown'
        c.to                = 'epub'
        c.content           = raw_content
        c.epub_metadata     = 'metadata.xml'
  #      c.epub_cover_image  = 'bookcover.png'
        c.epub_stylesheet   = 'epub.css'
        c.add_other_file    'assets/epub.css'
        c.add_other_file    'assets/metadata.xml'
  #      c.add_other_file    'assets/bookcover.png'
      end

      file.write epub
    end
  end

end

def make_zip_file(name, files)
  Zip::ZipFile.open(name, Zip::ZipFile::CREATE) do |zf|
    files.each do |file|
      if file =~ /\/$/
        zf.dir.mkdir(file)
        next
      end

      zf.file.open(file, "w") { |f| f.write File.read(file) }
    end
  end
end

def pull_in_code_examples
  `rm output/code_examples.zip`
  `zip -r output/code_examples.zip code_examples/`
end

namespace :package do

  task :common do
    `cp *.txt output`
  end

  desc 'Package up zip of book with code for individuals'
  task :individual => :common do
    pull_in_code_examples
    Dir.chdir('output') do
      `rm selenium_guidebook_individual.zip`
      make_zip_file('selenium_guidebook_individual.zip', [
          'The Selenium Guidebook.pdf',
          'The Selenium Guidebook.mobi',
          'The Selenium Guidebook.epub',
          'html/',
          'html/The Selenium Guidebook.html',
          'html/droid_sans.ttf',
          'html/bookcover.png',
          'copyright.txt',
          'individual_license.txt',
          'code_examples.zip'
      ])
    end
  end

  namespace :team do

    desc 'Package up zip of book with code for small teams'
    task :small => :common do
      Dir.chdir('output') do
        `rm selenium_guidebook_small_team.zip`
        make_zip_file('selenium_guidebook_small_team.zip', [
            'The Selenium Guidebook.pdf',
            'The Selenium Guidebook.mobi',
            'The Selenium Guidebook.epub',
            'html/',
            'html/The Selenium Guidebook.html',
            'html/droid_sans.ttf',
            'html/bookcover.png',
            'copyright.txt',
            'small_team_license.txt',
            'code_examples.zip'
        ])
      end
    end

    desc 'Package up zip of book with code for big teams'
    task :big => :common do
      Dir.chdir('output') do
        `rm selenium_guidebook_big_team.zip`
        make_zip_file('selenium_guidebook_big_team.zip', [
            'The Selenium Guidebook.pdf',
            'The Selenium Guidebook.mobi',
            'The Selenium Guidebook.epub',
            'html/',
            'html/The Selenium Guidebook.html',
            'html/droid_sans.ttf',
            'html/bookcover.png',
            'copyright.txt',
            'big_team_license.txt',
            'code_examples.zip'
        ])
      end
    end
  end

end
