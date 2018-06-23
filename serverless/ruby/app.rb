#!/usr/bin/env ruby

dist, html = ARGV

res = case dist
when "haml"
  require "html2haml"
  Html2haml::HTML.new(html, ruby19_style_attributes: true).render
when "slim"
  require "html2slim"
  HTML2Slim::HTMLConverter.new(html).to_s
end

puts res
