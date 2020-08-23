require_relative 'np_scraper'


class ParkScraper
  attr_accessor :name, :link, :location, :description, :information, :weather, :tours_and_camping, :wildlife, :nearby_parks, :image

  @@all = []

  def self.all
    @@all
  end

  def initialize(name=nil,link=nil)
    if name.include?("National Park")
      @name = name.rstrip
      @link = link
      self.assign_attributes
      @@all << self
    end
  end



  def assign_attributes

    page = Scraper.get_park_page(self.link).css(".fieldset-wrapper")
    alt_page = Scraper.get_park_page(self.link).css(".page")
    if page.children[5].children[1]
     self.image =  page.children[5].children[1].children[1].children[3].children[1].attributes["src"].to_s
    else
     self.image = alt_page.children[3].children[1].children[1].children[3].children[1].children[1].children[1].children[1].children[3].children[1].children[1].children[1].children[1].children[1].children[1].children[0].children[0].children[0].children[0].children[1].attributes["src"].to_s
    end


    location = page[3]

    if location.children.to_a.length >= 2

      if location.children[1].children[3].children[3].children[3].children.to_a.length > 1
        line_1 = location.children[1].children[3].children[3].children[3].children[1].children[0].text
        line_2 = location.children[1].children[3].children[3].children[3].children[3]


        if line_2
          line_2_sub = line_2.children[0].text.gsub("\n","").chomp(" ")
          line_3 = location.children[1].children[3].children[3].children[5].children.text.gsub("\n","").chomp(" ")
          line_4 = location.children[1].children[3].children[3].children[7].children[0].text
          self.location = "#{line_1} #{line_2_sub},  #{line_3}, #{line_4}"

        else
          alt_line_2 = location.children[1].children[3].children[3].children[5].children.text.gsub("\n","").chomp(" ")
          alt_line_3 = location.children[1].children[3].children[3].children[7].text
          self.location = "#{line_1},  #{alt_line_2}, #{alt_line_3}"
        end

      elsif location.children[1].children[3].children[3].children.to_a.length > 5
        line_1 = location.children[1].children[3].children[3].children[1].children[1].children.text
        line_2 = location.children[1].children[3].children[3].children[3].children.text.gsub("\n","").chomp(" ")
        line_3 = location.children[1].children[3].children[3].children[5].children.text
        self.location = "#{line_1},  #{line_2}, #{line_3}"

      else
        line_1 = location.children[1].children[3].children[3].children[1].children.text.gsub("\n","").chomp(" ")
        line_2 = location.children[1].children[3].children[3].children[3].children[0].text
        self.location = "#{line_1}, #{line_2}"
      end

    else
      line_1 = location.children[0].children[3].children[3].children[3].children[1].text
      line_2 = location.children[0].children[3].children[3].children[5].children.text.gsub("\n","").chomp(" ")
      line_3 = location.children[0].children[3].children[3].children[7].children[0].text
      self.location = "#{line_1},  #{line_2}, #{line_3}"
    end


    self.description = page[0].children[3].children.text.chomp("\n")


    information = page[0].children[11]

    if information
      self.information = information.children.text.split("   ")[0].split("<")[0].strip
    else
      self.information = page[0].text.split("   ")[0].split("Information")[1].split("<")[0].strip
    end


    weather = page[3].children[0].children[0].children[2]

    if weather
      self.weather = weather.children[1].children[0].text
    else
      self.weather = "There is no information available on the weather for this park."
    end



    tours_and_camping = page[3].children[0].children[1].children[2]

    if tours_and_camping
      self.tours_and_camping = tours_and_camping.children.text.gsub("\n","")
    else
      self.tours_and_camping = "There is no information available on the tours and camping in this park."
    end



    wildlife = page[3].children[0]

    if wildlife.children.to_a.length >= 3
      if wildlife.children[2].children.to_a.length >= 3
        self.wildlife = wildlife.children[2].children[2].children[1].children.text
      else
        self.wildlife = "There is no information available on wildlife in this park."
      end

    else
      self.wildlife = "There is no information available on wildlife in this park."
    end


    nearby_parks_page = Scraper.get_park_page(self.link).css(".three-col")

    park_1 = nearby_parks_page.children[10].children[1].children[3].children[1].text
    park_2 = nearby_parks_page.children[13].children[1].children[3].children[1].text
    park_3 = nearby_parks_page.children[16].children[1].children[3].children[1].text
    self.nearby_parks = []
    self.nearby_parks << park_1
    self.nearby_parks << park_2
    self.nearby_parks << park_3


    if self.name == "Yosemite National Park"
      self.information = "#{self.information.split("<")[0]}"
    end

  end

end
