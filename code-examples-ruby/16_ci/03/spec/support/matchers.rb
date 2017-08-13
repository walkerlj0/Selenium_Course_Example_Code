RSpec::Matchers.define :be_displayed do |expected|

  match do |actual|
    actual == true
  end

  failure_message_for_should do |actual|
    "Expected element to display, but it didn't. #{$job_message}"
  end

  failure_message_for_should_not do |actual|
    "Expected element to NOT display, but it did. #{$job_message}"
  end

end
