// Generic table should...
// There is always a tradeoff between making a component more cusomizable
// vs making it more easily used. The more customization options there are,
// the more fields a user needs to provide when they use the component.
function GenericTable({
    data = [], //This represents the data inside the table
    displayFields = [], // This represents the columns that will be rendered
  
  }) {
    
    return (
      <table className="gen-table">
        <thead>
          <tr>
            {displayFields.map((df) => (
              <th>{df.fieldName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => ( 
            <tr>
              {displayFields.map((df) => (
                <td>{df.fieldIdentifier(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default GenericTable;