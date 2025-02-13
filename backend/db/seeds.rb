10.times do |i|

  Book.create(title: "ダミーtitle#{i}", body: "ダミーbody#{i}")
  
end