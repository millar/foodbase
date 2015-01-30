Unit.define('slice') do |slice|
  slice.definition   = Unit.new('1 each')
  slice.aliases      = %w{slice slices}
  slice.kind        = :counting
end

Unit.define('pinch') do |pinch|
  pinch.definition   = Unit.new('1 each')
  pinch.aliases      = %w{pinch pinches}
  pinch.kind        = :counting
end

Unit.define('bunch') do |bunch|
  bunch.definition   = Unit.new('1 each')
  bunch.aliases      = %w{bunch bunches}
  bunch.kind        = :counting
end
