import React, { useState, useEffect } from 'react';
import './FormulaFinder.css'; // ✅ connect CSS here

const formulaData = [
  // Algebra (5 Formulas)
  { subject: 'algebra', title: 'Quadratic Formula', content: 'x = [-b ± √(b² - 4ac)] / 2a' },
  { subject: 'algebra', title: 'Pythagorean Theorem', content: 'a² + b² = c²' },
  { subject: 'algebra', title: 'Slope-Intercept Form', content: 'y = mx + b' },
  { subject: 'algebra', title: 'Binomial Expansion', content: '(a + b)² = a² + 2ab + b²' },
  { subject: 'algebra', title: 'Distance Formula', content: 'd = √[(x₂ - x₁)² + (y₂ - y₁)²]' },

  // Matrix (5 Formulas)
  { subject: 'matrix', title: 'Matrix Addition (2x2)', content: '[[a, b], [c, d]] + [[e, f], [g, h]]' },
  { subject: 'matrix', title: 'Determinant (2x2)', content: 'det(A) = ad - bc (for 2x2 matrix)' },
  { subject: 'matrix', title: 'Identity Matrix (2x2)', content: 'I = [[1, 0], [0, 1]]' },
  { subject: 'matrix', title: 'Scalar Multiplication', content: 'k * [[a, b], [c, d]] = [[ka, kb], [kc, kd]]' },
  { subject: 'matrix', title: 'Inverse Matrix (2x2)', content: 'A⁻¹ = (1/det(A)) * transpose' },

  // Indices (5 Formulas)
  { subject: 'indices', title: 'Product Rule', content: 'xᵃ * xᵇ = xᵃ⁺ᵇ' },
  { subject: 'indices', title: 'Quotient Rule', content: 'xᵃ / xᵇ = xᵃ⁻ᵇ' },
  { subject: 'indices', title: 'Power Rule', content: '(xᵃ)ᵇ = xᵃᵇ' },
  { subject: 'indices', title: 'Zero Power', content: 'x⁰ = 1 (x ≠ 0)' },
  { subject: 'indices', title: 'Negative Power', content: 'x⁻ᵃ = 1 / xᵃ' },

  // JavaScript (5 Common Syntax)
  { subject: 'javascript', title: 'Array Syntax (Literal)', content: 'const myArray = [value1, value2];' },
  { subject: 'javascript', title: 'Function Syntax (Arrow)', content: 'const func = (param) => { ... };' },
  { subject: 'javascript', title: 'Method Syntax (Object)', content: 'const obj = { key: function() { ... } };' },
  { subject: 'javascript', title: 'Console Syntax', content: 'console.log("message");' },
  { subject: 'javascript', title: 'Type Syntax (Declaration)', content: 'let num = 10; // Simple type inference' },
];

const subjectTags = ['All', 'Algebra', 'Matrix', 'Indices', 'JavaScript'];

const FormulaFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(formulaData);

  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase().trim();

    if (lowerCaseSearch === '' || lowerCaseSearch === 'all') {
      setFilteredItems(formulaData);
      return;
    }

    const newFilteredItems = formulaData.filter(item => {
      const isSubjectMatch = lowerCaseSearch === item.subject;
      const isContentMatch =
        item.title.toLowerCase().includes(lowerCaseSearch) ||
        item.content.toLowerCase().includes(lowerCaseSearch);
      return isSubjectMatch || isContentMatch;
    });

    setFilteredItems(newFilteredItems);
  }, [searchTerm]);

  return (
    <div className="formula-container">
      <div className="formula-wrapper">

        {/* Header */}
        <header className="formula-header">
          <h1 className="formula-title">Get Common Formulas and Syntax</h1>
          <p className="formula-subtitle">A quick reference guide for math and JavaScript essentials.</p>
        </header>

        {/* Subject Tags */}
        <div className="tag-container">
          {subjectTags.map(tag => (
            <span
              key={tag}
              className={`tag ${searchTerm.toLowerCase() === tag.toLowerCase() ? 'tag-active' : ''}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Type 'algebra', 'matrix', 'indices', or 'javascript'..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Results */}
        <main>
          {filteredItems.length === 0 ? (
            <div className="no-results">
              <p>No results found for "{searchTerm}". Try typing one of the subjects above.</p>
            </div>
          ) : (
            <div className="card-grid">
              {filteredItems.map((item, index) => (
                <div key={index} className="formula-card">
                  <span className="card-subject">{item.subject}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <div className="card-content">{item.content}</div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FormulaFinder;
