require_relative 'park_w_scraper'


class Scraper

  def self.run
    self.make_parks
    ParkScraper.all.each do |park|
      Park.create(park.instance_values)
    end
  end

  def self.get_page
    Nokogiri::HTML(URI.open("https://www.nationalparks.org/explore-parks/all-parks"))
  end

  def self.scrape_page
    get_page.css(".view-content form div div div select")
  end

  def self.make_parks
    scrape_page.each do |r|
      r.children.each do |s|
        sub_name = s.children.text.gsub("\n","")
        sub_link = "https://www.nationalparks.org"
        if sub_name != "Search for a Park"
          name = sub_name.chomp(" ")
          link = sub_link += s.attributes.fetch("value"){|key| block}.to_s[34...]
          ParkScraper.new(name,link)
        end
      end
    end
  end

  def self.get_park_page(link)
    Nokogiri::HTML(URI.open(link))
  end


end
