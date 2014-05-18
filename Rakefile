require 'redcarpet'
require 'redcarpet/render_strip'
require 'erb'
require 'pygments'
require 'docverter'
require 'zip/zipfilesystem'

@template = <<HERE
<html>
  <head>
    <title>Selenium Cheat Sheets</title>
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
    "<h#{header_level}>#{text}</h#{header_level}>\n"
  end

  def block_code(code, language)
    Pygments.highlight(code, :lexer => language)
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

@renderer_toc         = Redcarpet::Markdown.new(TOCwithChapterNumbering, :fenced_code_blocks => true)
@renderer_content     = Redcarpet::Markdown.new(HighlightedCopyWithChapterNumbering, :fenced_code_blocks => true)
@renderer_no_frills   = Redcarpet::Markdown.new(CopyWithNoFrills, :fenced_code_blocks => true)

def vacuum
  tmp = ""
  tmp << yield
  tmp << "\n\n"
  tmp
end

def cover
#  @renderer_no_frills.render( vacuum { File.read('content/cover.md') })
end

def preface
#  @renderer_no_frills.render( vacuum { File.read('content/preface.md') })
end

def toc
  '<h1>Table of Contents</h1>' + @renderer_toc.render(rip_content)
end

def content
  @renderer_content.render(rip_content)
end

def chapters
  Dir.glob('content/*.md')
end

def rip_content
  tmp = ""
  chapters.each do |chapter|
    tmp << File.read(chapter)
    tmp << "\n\n"
  end
  tmp
end

namespace :gen do
  desc 'Generate HTML'
  task :html do
    @content =  toc + content
    html = ERB.new(@template).result(binding)
    `rm -rf output/html`
    `mkdir output/html`
    File.open('output/html/SeleniumCheatSheets.html', 'w+') { |f| f.write html }
    `cp assets/* output/html`
  end

  desc 'Generate PDF'
  task :pdf do
    @content =  toc + content
    html = ERB.new(@template).result(binding)

    File.open('output/SeleniumCheatSheets.pdf', 'w+') do |f|
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


end
